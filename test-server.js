const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is working!\n');
});

const PORT = 5173;
server.listen(PORT, 'localhost', () => {
  console.log(`Test server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});