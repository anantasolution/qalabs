import express from "express";
import {
  allConsulations,
  ConsulationCount,
  getAllConsultations,
} from "../Controller/consulationController.js";

const router = express.Router();

router.post("/", allConsulations);

router.get("/getall", getAllConsultations);


//Total Counts of Consulation
router.get("/getcounts",ConsulationCount)


export default router;
