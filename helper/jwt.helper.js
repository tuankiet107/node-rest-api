const jwt = require("jsonwebtoken");

module.exports.verifyToken = (token, serectKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, serectKey, (err, result) => {
      if (err) {
        return reject("JWT has expired, please sign in to access page.");
      }
      resolve(result);
    });
  });
};
