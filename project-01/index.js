const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false })); // works on headers
// app.use((req, res, next) => {
//   console.log("Middleware 1 : ", req.body);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Middleware 2");
//   return res.json(req.body);
// });

//Routes

// users listing api
app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "CODSensei"); // X to show custom header
  return res.json(users);
});

// users rendering api
app.get("/users", (req, res) => {
  const html = `
        <ul>
        ${users
          .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
          .join("")}
        </ul>
    `;
  return res.send(html);
});

// user by id
// app.get("/api/user/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// new user
app.post("/api/user", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.status(201).json({ status: "success", id: users.length });
  });
});

// // update user
// app.patch("/api/user/:id", (req, res) => {
//   // TODO : update new user
//   res.json({ status: "pending" });
// });

// // delete user
// app.delete("/api/user/:id", (req, res) => {
//   // TODO : delete new user
//   res.json({ status: "pending" });
// });

// merging req on same route
app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
