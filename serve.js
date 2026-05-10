const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;

const server = http.createServer((req, res) => {
  const filePath = path.join('/root/invictus-mockup', req.url === '/' ? 'index.html' : req.url);
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    const contentType = ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'text/html';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch(e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on ${PORT}`);
});