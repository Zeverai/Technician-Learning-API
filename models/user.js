const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema
const userSchema = new mongoose.Schema({
   first_name: {
      type: String,
      required: true,
   },
   last_name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   prefs: Object,
   role: {
      type: String,
      enum: ["admin", "user", "dev"],
      required: true,
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
   updated_at: Date,
});

// Before saving new user, hash the pw & generate username from the first/last name
userSchema.pre("save", async function (next) {
   if (!this.username) {
      this.username = `${this.first_name[0]}${this.last_name}`.toLowerCase();
   }

   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
   }
   next();
});

// Check if password is correct
userSchema.methods.correctPassword = async function (candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
