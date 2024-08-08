const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { getIo } = require('../socket');

const { User } = require("../Mongoose/Schema");
mongoose
  .connect("mongodb://127.0.0.1:27017/Schmaster")
  .then(() => console.log("Database Connected!"));

dotenv.config({ path: "./config.env" });

const SECRET_KEY = process.env.JWT_SECRET_KEY;
async function SignUp(req, res) {
 try {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1000 days" });

  const result = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    id: token,
  });

  if (!result) res.status(401).json({ message: "Email Already Exists.." });
  res.cookie('token',token)
  res.status(200).json({
    isSign: true,
  });
 } catch (error) {
    res.send(error)
 }
}


async function SignIn(req, res) {
 try {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  let token;
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (user.id) {
    token = user.id;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
    });
  } else {
    token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1000 days" });
  }
  res.cookie('token',token)
  res.json({ token, isSign: true });
 } catch (error) {
    res.send(
       error
    )
 }
}



async function getCurrentUser(req, res) {
  try {
    const token = req.cookies.token;

    const currentUser = await User.findOne({ id: token });

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
    
    const io = getIo();
    io.emit('getAllUsers',allUsers);

    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    res.send({
      error,
    });
  }
}

async function getUserById(req, res,io) {
  try {
    const { user_id } = req.body;


    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }


    const user = await User.findOne({ id: user_id }); // Use findOne for a single user


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const io = getIo();
     
        io.emit('getUserById', { message: user });
     
   

    // Send the user data as a response
    res.status(200).json({ message: user });

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



async function logout(req,res){
  try {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Logged out successfully' });
} catch (error) {
    return res.status(500).send({ message: 'Logout failed', error: error.message });
}
}



async function protect(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }

      const user = await User.findOne({ id: token });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      
      req.user = user;

   
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}




module.exports = {
  SignUp,
  SignIn,
  protect,
  getCurrentUser,
  getAllUsers,
  getUserById,
  logout
};
