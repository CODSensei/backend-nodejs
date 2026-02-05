const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectMongoDB } = require("./connection");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const urlRoutes = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoutes = require("./routes/staticRoutes");

const app = express();
const PORT = 8081;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/user", userRoute);
app.use("/", staticRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
