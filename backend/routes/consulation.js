import express from "express";

import { allConsulations } from "../Controller/consulationController.js";

const router = express.Router();

router.post("/", allConsulations);

export default router;
