// Local-only preview; never exposes Git data, reports, or arbitrary disk files.
const http = require('node:http'), fs = require('node:fs');
const allowed = new Set(['index.html','app.js','offline.js','sw.js','data.js','lessons.js','manifest.json','icon-192.png','icon-512.png']);
const types = {html:'text/html',js:'text/javascript',json:'application/json',png:'image/png'};
http.createServer((req,res) => {
  const path = new URL(req.url,'http://localhost').pathname;
  const file = path === '/pinyin-pal/' ? 'index.html' : path.replace(/^\/pinyin-pal\//,'');
  if (!allowed.has(file) || req.method !== 'GET') { res.writeHead(404); res.end(); return; }
  res.writeHead(200, {'Content-Type': types[file.split('.').pop()], 'Cache-Control':'no-store'});
  fs.createReadStream(require('node:path').join(__dirname,file)).pipe(res);
}).listen(4173,'127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173/pinyin-pal/'));
