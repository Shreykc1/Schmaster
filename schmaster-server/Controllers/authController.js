const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { User } = require("../Mongoose/Schema");
mongoose
  .connect("mongodb://127.0.0.1:27017/Schmaster")
  .then(() => console.log("Database Connected!"));

dotenv.config({ path: "./config.env" });

global.idd;
const SECRET_KEY = process.env.JWT_SECRET_KEY;
async function SignUp(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1000 days" });

  const result = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    id: token,
  });

  if (!result) throw console.log("Data not added in database");
  res.status(200).json({
    token,
  });
}

function sendToken(req, res) {
  const { id } = req.body;
  console.log("i", id);
  global.idd = id;

  res.send(id);
}

async function SignIn(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  let token;
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (user.id) {
    token = user.id;
  } else {
    token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1000 days" });
  }

  res.json({ token, isSign: true });
}

function protect(req, res) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    res.json({ message: "Protected data", user: decoded.username });
  });
}

async function getCurrentUser(req, res) {
  try {
    const { token } = req.body;

    const id = token;
    const currentUser = await User.findOne({ id });

    if (!currentUser) throw Error;

    res.status(200).json({
      message: currentUser,
    });
  } catch (error) {
    res.send({
      error,
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    if (!allUsers) throw Error;
    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    res.send({
      error,
    });
  }
}

async function getUserById(req, res) {
  try {

    const { user_id } = req.body;
    const user = await User.find({ id: user_id });

    res.status(200).json({
      message: user,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
}

module.exports = {
  SignUp,
  SignIn,
  protect,
  getCurrentUser,
  sendToken,
  getAllUsers,
  getUserById
};
