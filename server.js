const http = require("http");
const url = require("url");

http
  .createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("hello node!\n");
  })
  .listen(8080);

url;

console.log("this is my first node server and it is on port 8080");
