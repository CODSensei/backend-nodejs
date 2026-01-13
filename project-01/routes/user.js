const express = require("express");
const {
  handleUpdateUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleDeleteUserById,
} = require("../controllers/user");

const router = express.Router();

// users rendering api
// router.get("/users", async (req, res) => {
//     const users = await User.find({});
//     const html = `
//     <ul>
//     ${users
//     .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
//     .join("")}
//     </ul>
//     `;
//     return res.send(html);
// });

router.get("/", handleGetAllUsers).post("/", handleCreateNewUser);
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
