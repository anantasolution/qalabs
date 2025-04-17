import express from "express";
import {
    getCompanyCount,
    createCompanyCount,
    updateCompanyCount,
} from "../Controller/companyCountController.js";

const router = express.Router();

router.get("/", getCompanyCount);
router.post("/", createCompanyCount);
router.put("/:id", updateCompanyCount);

export default router;