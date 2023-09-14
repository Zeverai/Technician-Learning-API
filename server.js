require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./app/routes/userRoutes");
const checkAuth = require("./middlewares/authCheck");
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware for handling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configure to front-end origin
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, tech-deck-auth-token"
   ); // Add tech-deck-auth-token to the allowed headers
   next();
});

// Routes that don't require authentication
// TODO: Set up public routes for createUser and login
app.use("/api/public", publicRoutes);

// Routes that require authentication
app.use("/api/private", checkAuth, privateRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
