const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: New Request on: ${req.url}\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    if (err) console.error(err);
    else {
      switch (req.url) {
        case "/":
          res.end("Home Page");
          break;
        case "/about":
          res.end("I am Krishna Agarwal");
          break;
        default:
          res.end("404 Not Found!!");
          break;
      }
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server is listening to port: 8000");
});
