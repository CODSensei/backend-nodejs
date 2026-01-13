const fs = require("fs");

const logReqRes = (fileName) => {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
      (error, data) => {
        next();
      }
    );
  };
};

module.exports = { logReqRes };
