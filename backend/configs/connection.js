// Trong file db.js
const mongoose = require('mongoose');
const configuration = require('./configuration');
const userModel = require('../models/user.model');

const connectDB = async () => {
  try {
    await mongoose.connect(configuration.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let ad = await userModel.findOne({ username: "student1" });
    if (!ad) {
      await userModel.create(configuration.student);
    }
    console.log("Connect to db successfully");
  } catch (error) {
    console.log("Cannot connect to db: " + error.message);
  }
};

module.exports = connectDB;
