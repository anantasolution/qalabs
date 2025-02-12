import express from "express";
import {
  allConsulations,
  deleteConsultation,
  ConsulationCount,
  getAllConsultations,
} from "../Controller/consulationController.js";

const router = express.Router();

router.post("/", allConsulations);

router.get("/getall", getAllConsultations);


//Total Counts of Consulation
router.get("/getcounts",ConsulationCount)


router.delete("/delete/:id",deleteConsultation);


export default router;
