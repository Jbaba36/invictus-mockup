const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  file = path.join('/root/invictus-mockup', file);
  if (fs.existsSync(file)) {
    const ext = path.extname(file);
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(fs.readFileSync(file));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(5000, () => console.log('Invictus mockup live on http://localhost:5000'));