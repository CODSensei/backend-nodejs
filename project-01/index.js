const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// connection to mongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/project-1") // automatically creates a db of name project-1
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Model
const User = mongoose.model("user", userSchema); // creates a collection user in mongoDb

app.use(express.urlencoded({ extended: false })); // works on headers

//Routes
// users listing api
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

// users rendering api
app.get("/users", async (req, res) => {
  const users = await User.find({});
  const html = `
        <ul>
        ${users
          .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
          .join("")}
        </ul>
    `;
  return res.send(html);
});

// new user
app.post("/api/user", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.job_title ||
    !body.email
  ) {
    return res.status(400).json({ msg: "All fields are required!" });
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  res
    .status(201)
    .json({ status: "success", msg: "User created successfully", result });
});

app
  .route("/api/user/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ error: "User not found!" });
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.gender ||
      !body.job_title ||
      !body.email
    ) {
      return res.status(400).json({ msg: "All fields are required!" });
    }
    fs.readFile("./MOCK_DATA.json", "utf-8", (error, result) => {
      if (error) console.error(error);
      let users = JSON.parse(result);
      let targetUserIndex = users.findIndex((user) => user.id === id);
      if (targetUserIndex === -1) {
        return res.status(404).json({ msg: "User not found!" });
      }
      users[targetUserIndex] = { id, ...body };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
        console.error(error);
      });
    });
    return res.json({ status: "success", id, ...body });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    fs.readFile("./MOCK_DATA.json", "utf-8", (error, result) => {
      if (error) console.error(error);
      let users = JSON.parse(result);
      let targetUserIndex = users.findIndex((user) => user.id === id);
      if (targetUserIndex === -1) {
        return res.status(404).json({ msg: "User not found!" });
      }
      users.splice(targetUserIndex, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
        console.error(error);
      });
    });
    return res.json({ status: "success" });
  });

app.listen(PORT, () => console.log("Server listening " + PORT));
