const User = require("../model/user");
const Blog = require("../model/blog");
module.exports.postaddBlog = async (req, res) => {
  try {
    //api/blogs
    let { title, body, userId } = req.body;
    let userExist = await User.findById(userId);
    if (userExist) {
      let newBlog = new Blog({
        title: title,
        body: body,
        date: Date.now(),
        userId: userId,
      });
      await newBlog.save();
      userExist.blogs.push(newBlog._id);
      await userExist.save();
      res.json({
        success: true,
        data: newBlog,
        message: "blog added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

module.exports.getreadBlog = async (req, res) => {
  try {
    let allblog = await Blog.find();
    res.json({
      success: true,
      data: allblog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
}

module.exports.getOneBlog =  async (req, res) => {
  try {
    // /api/blogs/:id
    let { id } = req.params;
    let blog = await Blog.findOne({ _id: id });
    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
      error: error.message,
    });
  }
}

module.exports.deleteOneBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let { userId } = req.body;
    let blogExist = await Blog.findById(blogId);
    if (!blogExist)
      return res.json({
        success: false,
        message: "Blog doest not exist",
      });
    if (blogExist.userId != userId)
      return res.json({
        success: false,
        message: "You are not allowed to delete this blog",
      });
    await Blog.findByIdAndDelete(blogId);
    let userExist = await User.findById(userId);
    let blog = userExist.blogs.filter((id) => id != blogId);
    userExist.blogs = blog;
    await userExist.save();
    res.json({
      success: true,
      message: "blog deleted successfully",
      data: userExist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
}