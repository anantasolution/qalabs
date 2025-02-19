import express from "express";
import { createAdmin, validateAdmin, loginAdmin, logoutAdmin, validateUser, updatePassword } from "../Controller/authController.js"

const router = express.Router();


// CreatingAdmin
router.post("/createAdmin", createAdmin);

//login admin
router.post("/loginAdmin", loginAdmin);

//validate user
router.get('/validate',validateUser)

//change password admin
router.put("/changePassword",updatePassword)

//logout
router.post("/logoutAdmin", logoutAdmin);

export default router;
