const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  req.user = null;
  // const authorizationHeaderValue = req?.headers["Authorization"];
  const tokenCookie = req?.cookies?.token;
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
  //   return next();

  if (!tokenCookie) return next();

  // const token = authorizationHeaderValue.split("Bearer ")[1];
  // const user = getUser(token);
  const user = getUser(tokenCookie);
  req.user = user;
  return next();
};

const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req?.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    next();
  };
};

module.exports = {
  checkForAuthentication,
  restrictTo,
};
