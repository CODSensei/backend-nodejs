const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  return mongoose.connect(url); // automatically creates a db of name project-1
};

module.exports = {
  connectMongoDB,
};
