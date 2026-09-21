// Pinyin Pal service worker
// Strategy: network-first for the app's own files (so updates show up on the next open),
// falling back to the cache when offline. Icons are cache-first.
const VERSION = "pp-v0.4.1";
const ASSETS = ["./", "index.html", "app.js", "data.js", "lessons.js", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // Security: only intercept and cache same-origin requests over http/https
  if (url.origin !== self.location.origin) return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  const isIcon = /\.png$/.test(url.pathname);
  if (isIcon) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
    return;
  }
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() =>
      caches.match(e.request, { ignoreSearch: true }).then(hit => {
        if (hit) return hit;
        // Security: only fall back to index.html for navigation requests to prevent MIME/script confusion
        if (e.request.mode === "navigate") {
          return caches.match("index.html");
        }
        return new Response("Not found", { status: 404, statusText: "Not Found" });
      })
    )
  );
});
