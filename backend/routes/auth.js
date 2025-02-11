import express from "express";
import {updatePassword ,createAdmin ,loginAdmin,logoutAdmin} from "../Controller/authController.js";
const router = express.Router();
// CreatingAdmin
router.post("/createAdmin", createAdmin);
router.post("/loginAdmin", loginAdmin);
router.put("/changePassword",updatePassword)
router.post("/logoutAdmin", logoutAdmin);
export default router;
