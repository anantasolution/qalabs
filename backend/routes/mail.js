import express from "express";
const router = express.Router();
import { sendVerificationMail, verifyToken } from "../models/mailController.js";
// Route to request forgot password (email submission)
router.post("/send-mail", sendVerificationMail);

// Route to handle the verification of the token
router.get("/verify-token/:token", verifyToken);

export default router;
