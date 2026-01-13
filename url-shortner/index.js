const express = require("express");
const urlRoutes = require("./routes/url");
const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8081;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error(e));

app.use(express.json());
app.use("/url", urlRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
