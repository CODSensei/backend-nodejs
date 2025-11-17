const http = require("http");
const fs = require("fs");
const { URL } = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hi " + req.query.name + " This is Home Page");
});
app.get("/about", (req, res) => {
  return res.send("Hi " + req.query.name + " This is About Page");
});

app.listen(8000, () => {
  console.log("Server is listening to port: 8000");
});
