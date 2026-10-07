// Loopback by default; optional private-network preview for device testing.
// Never exposes Git data, reports, or arbitrary disk files.
const http = require('node:http'), fs = require('node:fs');
const host = process.env.PP_PREVIEW_HOST || '127.0.0.1';
const localAddresses = Object.values(require('node:os').networkInterfaces()).flat().filter(Boolean).map(a => a.address);
const privateAddress = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);
if (host !== '127.0.0.1' && (!privateAddress || !localAddresses.includes(host))) {
  throw new Error('Preview host must be loopback or a private IPv4 address assigned to this computer.');
}
const port = host === '127.0.0.1' ? 4173 : 4174;
const allowed = new Set(['index.html','app.js','offline.js','sw.js','data.js','lessons.js','manifest.json','icon-192.png','icon-512.png','audio-check.html','audio-check.js']);
const types = {html:'text/html',js:'text/javascript',json:'application/json',png:'image/png'};
http.createServer((req,res) => {
  const path = new URL(req.url,'http://localhost').pathname;
  const file = path === '/pinyin-pal/' ? 'index.html' : path.replace(/^\/pinyin-pal\//,'');
  if (!allowed.has(file) || req.method !== 'GET') { res.writeHead(404); res.end(); return; }
  res.writeHead(200, {'Content-Type': types[file.split('.').pop()], 'Cache-Control':'no-store'});
  fs.createReadStream(require('node:path').join(__dirname,file)).pipe(res);
}).listen(port,host, () => console.log(`Preview: http://${host}:${port}/pinyin-pal/`));
