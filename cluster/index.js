const express = require("express");

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
