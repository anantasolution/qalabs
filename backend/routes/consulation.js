import express from "express";

import {
  allConsulations,
  getAllConsultations,
} from "../Controller/consulationController.js";

const router = express.Router();

router.post("/", allConsulations);
router.get("/getall", getAllConsultations);

export default router;
