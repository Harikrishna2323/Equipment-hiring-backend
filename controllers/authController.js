const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.comparePassword(password)) {
      return res.status(401).json({
        message: "Email and password does nnot match.",
      });
    }

    //   generate the jwt token

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);

    res.status(200).json({
      message: "Login sucess.",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Login Failed.",
      error,
    });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.statue(400).json({
        message: "Email already registered.",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: "Register successful.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
