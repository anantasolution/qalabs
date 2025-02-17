import express from "express";
import multer from "multer";
import {
  createFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
} from "../Controller/feedbackController.js";

const router = express.Router(); 

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/feedback/photos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/createfeedback", upload.single("profilePicture"), createFeedback);
router.get("/Getallfeedback", getAllFeedbacks);
router.put(
  "/updatefeedback/:id",
  upload.single("profilePicture"),
  updateFeedback
);
router.delete("/deletefeedback/:id", deleteFeedback);

export default router;
