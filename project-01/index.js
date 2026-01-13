const express = require("express");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// connection to mongoDb
connectMongoDB("mongodb://127.0.0.1:27017/project-1")
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error(e));

app.use(express.urlencoded({ extended: false })); // works on headers
app.use(logReqRes("log.txt"));

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("Server listening " + PORT));
