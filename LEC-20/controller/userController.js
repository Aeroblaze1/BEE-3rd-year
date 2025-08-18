const User = require("../model/user");

module.exports.postAddUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({
      success: true,
      data: newUser,
      message: "user added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    res.json({
      success: true,
      data: allusers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findOne({ _id: id }).populate("blogs");
    if (userExist) {
      res.json({
        success: true,
        data: userExist,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};