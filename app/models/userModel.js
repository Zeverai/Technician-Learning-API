const db = require("../../config/db");

const User = {
   //  * GET ALL USERS
   getAllUsers: () => {
      return new Promise((resolve, reject) => {
         db.query("SELECT * FROM users", (error, results) => {
            if (error) reject(error);
            resolve(results);
         });
      });
   },

   //  * GET SINGLE USER
   getUserById: (id) => {
      return new Promise((resolve, reject) => {
         db.query("SELECT * FROM users WHERE id = ?", id, (error, results) => {
            if (error) reject(error);
            if (results.length === 0) {
               console.log("User not found.");
               resolve(null); // User not found
            } else {
               console.log(results[0]);
               resolve(results[0]); // User found
            }
         });
      });
   },

   //  * GET USER BY EMAIL - this is used for LOGIN
   getUserByEmail: (email) => {
      return new Promise((resolve, reject) => {
         db.query("SELECT * FROM users WHERE email = ?", email, (error, results) => {
            if (error) reject(error);
            if (results.length === 0) {
               console.log("User not found.");
               resolve(null); // User not found
            } else {
               console.log(results[0]);
               resolve(results[0]); // User found
            }
         });
      });
   },

   //  * CREATE NEW USER
   createUser: (user) => {
      return new Promise((resolve, reject) => {
         db.query(
            "INSERT INTO users (username, email, first_name, last_name, password, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
            [
               user.username,
               user.email,
               user.first_name,
               user.last_name,
               user.password,
               user.is_admin,
            ],
            (error, result) => {
               if (error) reject(error);
               resolve(result);
            }
         );
      });
   },

   //  * UPDATE TARGET USER
   updateUser: (id, updatedUser) => {
      return new Promise((resolve, reject) => {
         db.query(
            "UPDATE users SET ? WHERE id = ?",
            [updatedUser, id],
            (error, result) => {
               if (error) reject(error);
               resolve(result);
            }
         );
      });
   },

   //  * DELETE TARGET USER
   deleteUser: (id) => {
      return new Promise((resolve, reject) => {
         db.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
            if (error) reject(error);
            resolve(result);
         });
      });
   },
};

module.exports = User;
