const express = require("express");
const path = require("path");
const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/staticRoutes");
const { connectMongoDB } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 8081;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoutes);
app.use("/", staticRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
