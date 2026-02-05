const User = require("../models/users");
const { v4: uuidV4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

const handleUserSignUp = async (req, res) => {
  const { userName, email, password } = req.body;
  await User.create({
    userName,
    email,
    password,
  });
  res.redirect("/login");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user)
    // return res.status(401).json({
    //   error: "Invalid email or password!",
    // });
    return res.redirect("/login");
  const sessionId = uuidV4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);

  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
