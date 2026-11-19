const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/login') {
    res.end('Login page - user authentication feature');
  } else {
    res.end('Hello, this is a basic web app!');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});