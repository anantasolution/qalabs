import express from "express";
import { createAdmin } from "../Controller/authController.js";
const router = express.Router();
// CreatingAdmin
router.post("/createAdmin", createAdmin);
export default router;
