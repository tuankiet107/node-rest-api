const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(422).json({
        status: "FAIL",
        message: "Email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    newUser.save();
    res.status(200).send({
      status: "OK",
      message: "Account successfully created.",
      data: {
        email: req.body.email,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: "FAIL",
      message: error,
    });
  }
};

module.exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(422).json({
      status: "FAIL",
      message: "Email is not found.",
    });
  }

  const accessToken = jwt.sign(
    {
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 15 * 60,
    },
    "ACCESS_TOKEN"
  );

  res.status(200).json({
    status: "OK",
    message: "Signin successful.",
    data: {
      expire: "Your access token will expire after 15 minutes.",
      accessToken,
    },
  });
};
