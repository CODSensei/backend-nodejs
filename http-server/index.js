const http = require("http");
const fs = require("fs");
const { URL } = require("url");

const myServer = http.createServer((req, res) => {
  // logger
  if (req.url === "/favicon.ico") return res.end();
  const myUrl = new URL(`http://localhost:8000${req.url}`);
  const log = `${Date.now()}: New ${req.method} Request on: ${
    myUrl.pathname
  }\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    if (err) console.error(err);
    else {
      switch (myUrl.pathname) {
        case "/":
          if (req.method === "GET") res.end("Home Page");
          break;
        case "/about":
          const username = myUrl?.searchParams.get("name");
          res.end(
            `Hi ${username !== null ? username : "user"}, I am Krishna Agarwal`
          );
          break;
        case "/signup":
          if (req.method === "GET") res.end("This is a signup form");
          else if (req.method === "POST") {
            // DB Query
            res.end("Success !!");
          }
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
