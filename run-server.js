#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const DIR = '/root/invictus-mockup';

const server = http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  file = path.join(DIR, decodeURIComponent(file));
  const ext = path.extname(file);
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json' };
  
  if (fs.existsSync(file)) {
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(fs.readFileSync(file));
  } else {
    res.writeHead(404);
    res.end('Not found: ' + req.url);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Invictus mockup live on http://0.0.0.0:${PORT}`);
});