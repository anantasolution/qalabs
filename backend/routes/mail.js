import express from "express";
const router = express.Router();
import {
  sendVerificationMail,
  verifyToken,
  resetPassword,
} from "../Controller/mailController.js";
// Route to request forgot password (email submission)
router.post("/send-mail", sendVerificationMail);

// Route to handle the verification of the token
router.get("/verify-token/:token", verifyToken);

// Route to reset password
router.post("/reset-password/:id", resetPassword);

export default router;
