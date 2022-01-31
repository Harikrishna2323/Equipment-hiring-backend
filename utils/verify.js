const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  const { cookie } = req.headers;
  try {
    const token = cookie.split("=")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Please login.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log("Error in authentication route");
    return res.status(401).json({
      message: "Unauthorized user.",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  const { user } = req;

  if (user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      message: "You need to be the admin.",
    });
  }
};
