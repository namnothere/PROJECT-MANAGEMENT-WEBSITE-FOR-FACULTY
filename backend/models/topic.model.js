const mongoose = require("mongoose");

const topicSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // 0:false, 1:true
    approveByManagement: {
      type: Number,
      default: 0,
    },

    student: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    teacherReview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    dayReivew: {
      type: String,
      default: null,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    major: { type: mongoose.Schema.Types.ObjectId, ref: "major" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("topic", topicSchema);
