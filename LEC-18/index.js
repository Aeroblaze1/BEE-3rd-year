const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ODM - object data modelling , ORM- object relational mapping

const Blogs = require("./model/blog");
const User = require("./model/user");

app.post("/blogs", async (req, res) => {
  let { title, body, userId } = req.body;

  let userExist = await User.findById(userId);

  if (!userExist) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let newBlog = new Blogs({
    title,
    body,
    date: new Date(),
    userid: userId // ✅ matches schema in blog.js
  });

  await newBlog.save();

  userExist.blogs.push(newBlog._id);
  await userExist.save(); // ✅ persist array change

  res.json({
    success: true,
    data: newBlog,
    message: "Blog added successfully",
  });
});


app.get("/blogs", async (req, res) => {
  let allblogs = await Blogs.find();
  res.json({
    success: true,
    data: allblogs,
  });
});
app.get("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  let blog = await Blogs.findOne({ _id: id });
  res.json({
    success: true,
    data: blog,
  });
});

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
  let user = await User.findById(id).populate("blogs"); // ✅ fetch blog objects
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({
    success: true,
    data: user,
  });
});


//mongodb stores data in bson format
app.listen(4445, () => {
  console.log("server started");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/g26db")
  .then(() => console.log("Connected"));
