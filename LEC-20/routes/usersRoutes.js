const express = require("express");
const router = express.Router(); //small --->app
const userController = require("../controller/userController");


// user routes (mounted at /api/users)
router.post("/", userController.postAddUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;
