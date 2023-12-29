const multer = require("multer");

// Multer config for storing the user's submitted image
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./img/exam_images");
   },
   filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
   },
});

// Check if the file type is allowed
const fileFilter = (req, file, cb) => {
   if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/svg+xml"
   ) {
      cb(null, true);
   } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and SVG are allowed."), false);
   }
};

// Upload image to db
const upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 20, // 20MB max img size
   },
   fileFilter: fileFilter,
});

// Upload image to db
exports.uploadImage = (req, res, next) => {
   upload.single("image")(req, res, (error) => {
      if (error) {
         return res.status(400).json({ message: error.message });
      }
      res.status(200).json({
         message: "Image uploaded successfully!",
         filePath: `/img/exam_images/${req.file.filename}`,
      });
   });
};
