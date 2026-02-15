const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(status());

fs.createReadStream("./Sample.txt", "utf-8").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./Sample.zip")),
);

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./Sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
