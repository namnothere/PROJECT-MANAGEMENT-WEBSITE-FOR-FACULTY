const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    username: {
      type: String,
      required: false,
      unique: true,
    },

    password: {
      type: String,
      required: false,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    major: { type: mongoose.Schema.Types.ObjectId, ref: "major" },

    birth: {
      type: String,
    },

    address: {
      type: String,
    },

    // 0: female 1:male
    sex: {
      type: Number,
    },

    // 0: student 1:teacher 2:dphead 3:admin
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
