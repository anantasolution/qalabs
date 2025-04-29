import express from "express";
import {
  getAllAdmin,
  getSpecificAdmin,
  updateAdmin,
  disableAdmin,
  enableAdmin,
  changePassword,
  deleteAdmin,
  getAdminById
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

router.delete("/deleteAdmin/:id", deleteAdmin);

//Get admin by id
router.get('/getadmin/:id',getAdminById)


// change anyones password by anyone
router.put("/changePassword/:adminId", changePassword);

export default router;
