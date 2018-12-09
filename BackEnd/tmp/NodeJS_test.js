const http = require('http');

const hostname = '127.0.0.1';  //change with current BIOS instance of the device
const port = 3000; //determined by user

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
