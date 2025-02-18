import express from "express";
import multer from "multer";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../Controller/feedbackController.js";
import { uploadProfilePicture } from "../utils/storageMulter.js";

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
router.post("/createfeedback", uploadProfilePicture, createFeedback);
router.get("/getallfeedbacks", getAllFeedbacks);
router.get("/getfeedback/:id", getFeedbackById);
router.put("/updatefeedback/:id", uploadProfilePicture, updateFeedback);
router.delete("/deletefeedback/:id", deleteFeedback);

export default router;
