const User = require("../models/user");

// retrieve list of all users
exports.getAllUsers = async (req, res) => {
   try {
      const users = await User.find().select("-password"); // Exclude the password
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

// retrieve one user
exports.getUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select("-password");
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

exports.createUser = async (req, res) => {
   try {
      console.log("Creating new user account.");

      // Check submitted information
      const { first_name, last_name, email, role } = req.body;

      // Ensure email is provided
      if (!role || role.trim() === "") {
         return res
            .status(400)
            .json({ message: "A valid email is required to create a new account." });
      }

      // Ensure first and last name are provided
      if (
         !first_name ||
         first_name.trim() === "" ||
         !last_name ||
         last_name.trim() === ""
      ) {
         return res
            .status(400)
            .json({ message: "User account must contain a first and last name." });
      }

      // Ensure role is provided
      if (!role || role.trim() === "") {
         return res.status(400).json({ message: "An account role is required." });
      }

      // Set new account password to 'password'
      console.log("Setting new user account password to default value.");
      const password = "password";

      // Set new account prefs to default empty object
      console.log("Setting new user preferences to application defaults.");
      const prefs = {};

      const username = `${first_name[0]}${last_name}`.toLowerCase();
      const newUser = new User({
         first_name,
         last_name,
         email,
         prefs,
         role,
         username,
         password,
      });

      await newUser.save();
      res.status(201).json(newUser);
   } catch (error) {
      console.error("Error in createUser:", error);
      res.status(500).json({ message: "Server error", error: error.message });
   }
};

exports.updateUser = async (req, res) => {
   try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      }).select("-password");
      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

exports.deleteUser = async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).json({ message: "User deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};
