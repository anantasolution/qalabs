import express from "express";

import { allContacts } from "../Controller/contactController.js";

const router = express.Router();

router.post("/", allContacts);

export default router;
