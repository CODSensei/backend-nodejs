const cluster = require("node:cluster");
const express = require("express");
const os = require("os");

const totalCPUS = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUS; i++) {
    cluster.fork();
  }
} else {
  const PORT = process.env.PORT || 8000;
  const app = express();

  app.get("/", (req, res) => {
    return res.json({
      message: `Hello from express server ${process.pid}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
