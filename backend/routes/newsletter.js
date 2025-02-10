import express from "express";
import { createNewsletter, getAllNewsletters } from "../Controller/newsLetterController.js";

const router = express.Router();

router.post("/create", createNewsletter);
router.get("/getAll", getAllNewsletters);

export default router;