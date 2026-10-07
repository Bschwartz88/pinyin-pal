// Bump VERSION whenever an app asset changes. Cache each release as a unit.
const VERSION = "v0.7.9";
const PREFIX = `pinyin-pal:${self.registration.scope}:`;
const CACHE = PREFIX + VERSION;
const ASSETS = ["./", "index.html", "app.js", "offline.js", "data.js", "lessons.js", "manifest.json", "icon-192.png", "icon-512.png"];
const urls = ASSETS.map(path => new URL(path, self.registration.scope).href);
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(urls.map(url => new Request(url, { cache: "reload" })))));
  // Updates wait until the learner restarts or closes all app windows.
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
  // Leave unscoped legacy caches alone to protect other apps on this origin.
});
self.addEventListener("message", event => {
  if (event.data?.type === "ACTIVATE_UPDATE") event.waitUntil(self.skipWaiting());
  if (event.data?.type === "OFFLINE_STATUS" && event.ports[0]) {
    event.waitUntil(caches.open(CACHE).then(async cache => {
      const results = await Promise.all(urls.map(url => cache.match(url)));
      event.ports[0].postMessage({ version: VERSION, ready: results.every(Boolean) });
    }));
  }
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  url.search = "";
  if (!urls.includes(url.href)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(url.href);
    if (hit) return hit;
    return new Response("Offline files are incomplete. Reconnect and check for updates in Settings.", {
      status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }));
});
