const mongoose = require("mongoose");

const periodSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    timeOpen: {
      type: String,
    },
    timeClose: {
      type: String,
    },
    major: { type: mongoose.Schema.Types.ObjectId, ref: "major" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("period", periodSchema);
