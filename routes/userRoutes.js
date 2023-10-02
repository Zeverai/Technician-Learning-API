const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/get-all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/create", userController.createUser);
router.put("/edit/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
