const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};

// ===============================================| LOGIN
exports.login = async (req, res) => {
   // Destructure login data from request body
   const { email, password } = req.body;
   console.log(`Login attempt: ${email}`);

   // 1. Check if email and password exist
   if (!email || !password) {
      return res.status(400).send({ message: "Please provide email and password!" });
   }

   // 2. Check if user exists and password is correct
   const user = await User.findOne({ email }).select("+password");

   if (!user || !(await user.correctPassword(password))) {
      return res.status(401).send({ message: "Incorrect email or password." });
   }

   // 3. If everything is okay, send the token to the client
   const token = signToken(user._id);
   res.cookie("auth_token", token, {
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
   });

   // 4. Make sure password is removed from user obj before sending to client
   const userObject = user.toObject();
   delete userObject.password;

   console.log(`Token: ${token}\nd\nuser: ${userObject.first_name}`);
   res.status(200).send({
      status: "success",
      token,
      user: userObject,
   });
};

// logout
exports.logout = (req, res) => {
   res.cookie("auth_token", "", {
      expires: new Date(0), // Set token expiry to a past date, forcing invalidation & logout.
      httpOnly: true,
   });
   res.status(200).json({ message: "Logged out successfully" });
};

// verify logged in user
exports.verifyUser = (req, res) => {
   const token = req.cookies.auth_token;
   if (!token) {
      return res.status(401).send({ status: "fail", message: "Not authenticated" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(decoded.id).then((user) => {
         if (!user) {
            return res.status(401).send({ status: "fail", message: "User not found" });
         }
         res.status(200).send({ status: "success", user });
      });
   } catch (error) {
      res.status(401).send({ status: "fail", message: "Invalid token" });
   }
};
