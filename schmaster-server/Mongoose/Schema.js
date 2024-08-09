const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  streaks: { type: Number, default: 0 },

  lastStreakUpdate: { type: Date, default: null }
});

const streaksSchema = new mongoose.Schema({
  userID: {
    type: String,
    required:true,
  },

  streaks: {
    type: Number
  },

  breakDate: {
    type: Date,
    default: Date.now()
  }

})

const Streaks = mongoose.model("streaks", streaksSchema)



const User = mongoose.model("user", userSchema);


  
module.exports = { User, Streaks };
