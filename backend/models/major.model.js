const mongoose = require("mongoose");

const majorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isBlock: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("major", majorSchema);
