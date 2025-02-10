import multer from "multer";
import fs from "fs";
import path from "path";

// Function to create storage dynamically
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (file.fieldname === "image") {
      uploadPath = "uploads/blog/photos"; // Blog cover image
    } else if (file.fieldname === "contentImage") {
      uploadPath = "uploads/contentofblog/photos"; // Blog content image
    } else {
      uploadPath = "uploads/photos";
    }

    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure folder exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Allowed: png, jpg, jpeg, webp"), false);
  }
};

export const uploadBoth = multer({
  storage,
  fileFilter,
}).fields([
  { name: "image", maxCount: 1 }, // Blog cover image
  { name: "contentImage", maxCount: 1 }, // Blog content image
]);

export const uploadImageOfBlog = multer({
  storage,
  fileFilter,
});

export const uploadContentImageOfBlog = multer({
  storage,
  fileFilter,
});
