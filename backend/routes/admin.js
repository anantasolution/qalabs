import express from "express";
import {
  getAllAdmin,
  getSpecificAdmin,
  updateAdmin,
  disableAdmin,
  enableAdmin,
  changePassword,
} from "../Controller/adminController.js";

const router = express.Router();
//Get All Admin
router.get("/getAllAdmin", getAllAdmin);
//Get Specific Admin
router.get("/getSpecificAdmin/:id", getSpecificAdmin);
//Update Specific admin
router.put("/updateAdmin/:id", updateAdmin);
//Enable Admin
router.put("/enableAdmins", enableAdmin);
//disableAdmin Admin
router.put("/disableAdmins", disableAdmin);

// change anyones password by anyone
router.put("/changePassword/:adminId", changePassword);

export default router;
