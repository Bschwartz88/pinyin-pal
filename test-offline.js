// Isolated service-worker lifecycle tests; no browser or network required.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const { isMandarinVoice, chooseMandarinVoice } = require('./offline');
function worker(failInstall = false) {
  const listeners = {}, cachesByName = new Map();
  let activations = 0;
  const scope = 'https://example.test/pinyin-pal/';
  const caches = {
    async open(name) {
      if (!cachesByName.has(name)) cachesByName.set(name, new Map());
      const data = cachesByName.get(name);
      return {
        async addAll(requests) {
          if (failInstall) throw Error('network unavailable');
          for (const request of requests) {
            const file = new URL(request.url).pathname.split('/').pop() || 'index.html';
            assert.ok(fs.existsSync(file), `missing install asset: ${file}`);
            data.set(request.url, new Response(file));
          }
        },
        async match(url) { return data.get(typeof url === 'string' ? url : url.url)?.clone(); }
      };
    },
    async keys() { return [...cachesByName.keys()]; },
    async delete(name) { return cachesByName.delete(name); }
  };
  vm.runInNewContext(fs.readFileSync('sw.js', 'utf8'), {
    URL, Request, Response, caches,
    self: { registration: { scope }, clients: { claim: async () => {} },
      skipWaiting: async () => { activations++; }, addEventListener: (name, fn) => { listeners[name] = fn; } }
  });
  async function fire(name, extra = {}) {
    let result;
    listeners[name]({ waitUntil: p => { result = p; }, respondWith: p => { result = p; }, ...extra });
    return result;
  }
  return { fire, cachesByName, scope, activations: () => activations };
}
test('offline voice selection preserves online preference but falls back to local Mandarin', () => {
  const local = { name:'Tingting', lang:'zh-CN', localService:true, voiceURI:'local' };
  const remote = { name:'Remote', lang:'zh-CN', localService:false, voiceURI:'remote' };
  const cantonese = { name:'Cantonese', lang:'zh-HK', localService:true, voiceURI:'hk' };
  assert.equal(chooseMandarinVoice([remote, local], 'remote', false), remote);
  assert.equal(chooseMandarinVoice([remote, local], 'remote', true), local);
  assert.equal(chooseMandarinVoice([remote, cantonese], 'remote', true), null);
  assert.equal(chooseMandarinVoice([], null, false), null);
  assert.ok(isMandarinVoice({lang:'cmn-Hans-CN'}));
  assert.ok(!isMandarinVoice({lang:'yue-HK'}));
});
test('installed app serves all essential files without fetching the network', async () => {
  const w = worker(); await w.fire('install');
  for (const path of ['', 'index.html', 'app.js', 'offline.js', 'lessons.js', 'data.js', 'manifest.json', 'icon-192.png', 'icon-512.png']) {
    const response = await w.fire('fetch', { request: new Request(w.scope + path + '?test=1') });
    assert.equal(response.status, 200);
  }
  let result;
  await w.fire('message', { data:{type:'OFFLINE_STATUS'}, ports:[{postMessage: value => { result = value; }}] });
  assert.equal(result.ready, true);
  assert.equal(w.activations(), 0);
  await w.fire('message', {data:{type:'ACTIVATE_UPDATE'}});
  assert.equal(w.activations(), 1);
});
test('activation preserves other apps and removes only this scope older releases', async () => {
  const w = worker();
  for (const key of ['other-app', 'pp-v0.4.2', 'pinyin-pal:https://example.test/other/:v0', `pinyin-pal:${w.scope}:old`]) w.cachesByName.set(key, new Map());
  await w.fire('install'); await w.fire('activate');
  assert.ok(w.cachesByName.has('other-app'));
  assert.ok(w.cachesByName.has('pp-v0.4.2'));
  assert.ok(w.cachesByName.has('pinyin-pal:https://example.test/other/:v0'));
  assert.ok(!w.cachesByName.has(`pinyin-pal:${w.scope}:old`));
});
test('unrelated requests are not intercepted; missing cache is not reported ready', async () => {
  const w = worker();
  for (const url of ['https://example.test/other/app.js', 'https://external.test/app.js', w.scope+'unknown.js']) {
    assert.equal(await w.fire('fetch', {request:new Request(url)}), undefined);
  }
  assert.equal(await w.fire('fetch', {request:new Request(w.scope+'app.js', {method:'POST'})}), undefined);
  let result;
  await w.fire('message', {data:{type:'OFFLINE_STATUS'},ports:[{postMessage:r => { result=r; }}]});
  assert.equal(result.ready, false);
  const response = await w.fire('fetch', {request:new Request(w.scope+'app.js')});
  assert.equal(response.status, 503);
});
test('failed download rejects install and does not activate or delete existing caches', async () => {
  const w = worker(true); w.cachesByName.set('existing', new Map());
  await assert.rejects(w.fire('install'));
  assert.ok(w.cachesByName.has('existing'));
  assert.equal(w.activations(), 0);
});
