const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const UserController = {
   //  * GET ALL USERS
   getAllUsers: async (req, res) => {
      try {
         const users = await User.getAllUsers();
         res.json(users);
      } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
      }
   },

   //  * GET SINGLE USER
   getUserById: async (req, res) => {
      const userId = req.params.id;
      try {
         const user = await User.getUserById(userId);
         if (user === null) {
            res.status(404).json({ error: "User not found" });
         } else {
            res.json(user);
         }
      } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
      }
   },

   //  * CREATE NEW USER
   createUser: async (req, res) => {
      console.log("createUser route hit");

      const { username, email, first_name, last_name, password, is_admin } = req.body;

      try {
         // Hash the password using bcrypt with the SECRET as salt
         const salt = await bcrypt.genSalt(10); // Generate a salt
         const hashedPassword = await bcrypt.hash(password + process.env.SECRET, salt);
         // Create a new user object with the hashed password
         const newUser = {
            username,
            email,
            first_name,
            last_name,
            password: hashedPassword,
            is_admin,
         };

         // Insert the new user into the database
         const result = await User.createUser(newUser);

         // Check if the user was successfully created
         if (result.insertId) {
            res.json({ message: "User registered successfully" });
         } else {
            res.status(500).json({ error: "Failed to create user" });
         }
      } catch (error) {
         console.error("Error during user creation:", error); // <-- Add this line

         res.status(500).json({ error: "Internal Server Error" });
      }
   },

   //  * UPDATE TARGET USER
   updateUser: async (req, res) => {
      const userId = req.params.id;
      const updatedUser = req.body;
      try {
         const result = await User.updateUser(userId, updatedUser);
         if (result.affectedRows === 0) {
            res.status(404).json({ error: "User not found" });
         } else {
            res.json({ message: "User updated successfully" });
         }
      } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
      }
   },

   //  * DELETE TARGET USER
   deleteUser: async (req, res) => {
      const userId = req.params.id;
      try {
         const result = await User.deleteUser(userId);
         if (result.affectedRows === 0) {
            res.status(404).json({ error: "User not found" });
         } else {
            res.json({ message: "User was deleted successfully." });
         }
      } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
      }
   },

   //* LOGIN USER
   userLogin: async (req, res) => {
      const { email, password } = req.body;

      try {
         const user = await User.getUserByEmail(email);

         if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
         }

         // Check the password
         const isPasswordValid = await bcrypt.compare(
            password + process.env.SECRET,
            user.password
         );

         if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
         }

         // If email and password are correct, create/sign a jwt token
         const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, {
            expiresIn: "3h", // token will expire in 3 hours
         });

         res.json({ token });
      } catch (error) {
         console.error("Error during user login:", error);
         res.status(500).json({ error: "Internal Server Error" });
      }
   },
};

module.exports = UserController;
