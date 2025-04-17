import express from "express";
import {
    createNetwork,
    getAllNetworks,
    updateNetwork,
    deleteNetwork
} from "../Controller/networkController.js";

const router = express.Router();

router.post("/", createNetwork);
router.get("/", getAllNetworks);
router.put("/:id", updateNetwork);
router.delete("/:id", deleteNetwork);

export default router;