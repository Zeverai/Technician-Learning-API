const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// * GET all users
router.get("/users", UserController.getAllUsers);

// * GET a single user by ID
router.get("/users/:id", UserController.getUserById);

// * Create a new user
router.post("/createUser", UserController.createUser);

// * Update a user by ID
router.put("/users/:id", UserController.updateUser);

// * Delete a user by ID
router.delete("/users/:id", UserController.deleteUser);

// * User Login
router.post("/login", UserController.userLogin);

module.exports = router;
