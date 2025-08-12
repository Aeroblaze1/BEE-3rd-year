const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ODM - object data modelling , ORM- object relational mapping

const Blogs = require("./model/user");

app.post("/blogs", async (req, res) => {
  let { title, body } = req.body;
  //   console.log(title, body);
  //   res.send("got it");

  let newBlog = new Blogs({
    title: title,
    body: body,
    date: new Date().now,
  });

  await newBlog.save();
  res.json({
    sucess: true,
    data: newBlog,
    message: "blog added successfully",
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

//mongodb stores data in bson format
app.listen(4445, () => {
  console.log("server started");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/g26db")
  .then(() => console.log("Connected"));
