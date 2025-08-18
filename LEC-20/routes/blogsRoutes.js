const express = require("express");
const router = express.Router(); //small --->app
const Blog = require("../model/blog"); // Import the Blog model

const {
  postaddBlog,
  getOneBlog,
  getreadBlog,
  deleteOneBlog,
} = require("../controller/blogController");

router.post("/", postaddBlog);
router.get("/", getreadBlog);
router.get("/:id", getOneBlog);

//delete blog
router.delete("/:blogId", deleteOneBlog);

module.exports = router;
