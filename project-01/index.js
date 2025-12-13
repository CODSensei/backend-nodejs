const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

//Routes

// users listing api
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// users rendering apu
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.json({ status: "success", id: users.length });
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
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO : update new user
    res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // TODO : delete new user
    res.json({ status: "pending" });
  });

app.listen(PORT, () => console.log("Server listening " + PORT));
