const express = require("express");
const router = express.Router();
const { m5 } = require("../middleware/routerlevel");

router.use(m5);

// Create user
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "user added successfully",
  });
});

// List users
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "all users data fetched successfully",
  });
});

// Return the userId set by app-level middleware
router.get("/id", (req, res) => {
  res.json({
    success: true,
    userId: req.userId || null,
  });
});

// Get user by id param
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    message: "user fetched",
    id,
  });
});

module.exports = router;