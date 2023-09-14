/* =============================================================================================
 * Middleware to validate JWT tokens when accessing private routes.
 *
 * DEVELOPER NOTE:
 * 1. Attach the JWT token to the headers of the request with { key: 'tech-deck-auth-token' }.
 * 2. The checkAuth function will check for the token in the headers.
 * 3. If the token is not present, a response with status 401 (Unauthorized) will be sent.
 * 4. If the token is present, but deemed invalid or expired, a 400 (Bad Request) response will be sent.
 * 5. If the token is valid, the request will proceed to the next middleware or handler.
 *
 * Note: Attach this middleware to any route to protect with JWT token, "tech-deck-auth-token" from
 * the user's cookies.
 ============================================================================================= */

const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
   const token = req.header("tech-deck-auth-token");
   if (!token) return res.status(401).send("Access Denied");

   try {
      const verified = jwt.verify(token, process.env.SECRET);
      req.user = verified; // Now you can use req.user in routes to get the user's details
      console.log(
         "-| /auth/authCheck.js =>\n-| checkAuth() =>\n-| response(User is verified. DB access granted.)"
      );
      next();
   } catch (err) {
      console.log("Invalid token, API access denied.");
      res.status(400).send("Invalid Token");
   }
}

module.exports = checkAuth;
