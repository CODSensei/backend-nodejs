const { getUser } = require("../service/auth");

const restrictToLoggedInUserOnly = (req, res, next) => {
  const useruid = req?.headers["Authorization"];

  if (!useruid) return res.redirect("/login");
  const token = useruid.split("Bearer ")[1];
  const user = getUser(token);
  if (!user) return res.redirect("/signup");

  req.user = user;
  next();
};

async function checkAuth(req, res, next) {
  const useruid = req?.headers["authorization"];
  const token = useruid.split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
