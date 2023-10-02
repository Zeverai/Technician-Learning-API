const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Create App
const app = express();

// TODO Cors - Fix for dynamic prod/dev modes and whatnot.
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);

// Connect to MongoDB
mongoose
   .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("Connected to database.");
   });

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
