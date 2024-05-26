require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const connectDB = require("./configs/connection");

const router = require("./routers");
const passport = require('passport');
require('./service/passport');

// Google Login API
const keys = require('./configs/key');

app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Session middleware
app.use(session({ secret: 'tnhubh', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Define routes
router(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TTN application." });
});

// Set port and start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
