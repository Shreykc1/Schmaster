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



const User = mongoose.model("user", userSchema);


module.exports = { User };
