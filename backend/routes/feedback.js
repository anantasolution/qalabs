import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../Controller/feedbackController.js";
import { uploadProfilePicture } from "../utils/storageMulter.js";

const router = express.Router();

// Routes
router.post("/createfeedback", uploadProfilePicture, createFeedback);
router.get("/getallfeedbacks", getAllFeedbacks);
router.get("/getfeedback/:id", getFeedbackById);
router.put("/updatefeedback/:id", uploadProfilePicture, updateFeedback);
router.delete("/deletefeedback/:id", deleteFeedback);

export default router;
