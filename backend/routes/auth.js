import express from "express";
import { createAdmin ,loginAdmin} from "../Controller/authController.js";
const router = express.Router();
// CreatingAdmin
router.post("/createAdmin", createAdmin);
router.post("/loginAdmin", loginAdmin);
export default router;
