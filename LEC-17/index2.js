const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("./model/user2");

app.post("/users", async (req, res) => {
  let { email, username, password } = req.body;

  let newUser = new User({
    email: email,
    username: username,
    password: password,
  });

  await newUser.save();
  res.json({
    success: true,
    data: newUser,
    message: "User added successfully",
  });
});

app.get("/users", async (req, res) => {
  let allUsers = await User.find();
  res.json({
    success: true,
    data: allUsers,
  });
});

// Get single user by ID
app.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  let user = await User.findOne({ _id: id });
  res.json({
    success: true,
    data: user,
  });
  console.log(user.email);
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/g26db")
  .then(() => console.log("Connected"));

app.listen(4446, () => {
  console.log("server started");
});
