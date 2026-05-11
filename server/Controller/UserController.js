const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "All fields are required!!",
      });
    }
    const userData = await UserModel.findOne({ email });
    if (userData) {
      return res.status(409).json({
        responseCode: "409",
        responseMessage: "User already exist,you can login!!",
      });
    }
    const usermodel = new UserModel({ name, email, password });
    usermodel.password = await bcrypt.hash(password, 10);
    await usermodel.save();

    res.status(201).json({
      responseCode: "201",
      responseMessage: "Signup successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in signing up!!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "All fields are required!!",
      });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "User not found!!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        responseCode: "401",
        responseMessage: "Invalid email or password!!",
      });
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" },
    );
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Login successfully!!",
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in logging up!!",
    });
  }
};
module.exports = { signupUser, loginUser };
