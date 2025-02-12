import express from "express";
import {
  allConsulations,
  deleteConsultation,
  getAllConsultations,
} from "../Controller/consulationController.js";

const router = express.Router();

router.post("/", allConsulations);

router.get("/getall", getAllConsultations);

router.get("/getall", getAllConsultations);

router.delete("/delete/:id",deleteConsultation);


export default router;
