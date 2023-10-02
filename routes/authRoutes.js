const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// LOGIN
router.post("/login", authController.login);

// LOGOUT
router.post("/logout", authController.logout);

// VERIFY logged in user token
router.get("/verify-user", authController.verifyUser);

module.exports = router;
