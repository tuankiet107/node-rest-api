const { verifyToken } = require("../helper/jwt.helper");

module.exports = async function (req, res, next) {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(400).send({
      status: "FAIL",
      message: "Access denied.",
    });
  }
  try {
    const user = await verifyToken(token, "ACCESS_TOKEN");
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({
        status: "FAIL",
        message: "Invalid Token.",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: error,
    });
  }
};
