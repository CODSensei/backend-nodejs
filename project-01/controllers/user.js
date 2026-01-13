const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.json(users);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ error: "User not found!" });
  return res.json(user);
};

const handleCreateNewUser = async (req, res) => {
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
};

const handleUpdateUserById = async (req, res) => {
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
  await User.findByIdAndUpdate(req.params.id, {
    ...body,
  });
  return res.json({ status: "success", id: req.params.id, ...body });
};

const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateUserById,
  handleDeleteUserById,
};
