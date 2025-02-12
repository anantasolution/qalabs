import express from "express";

import { allContacts, deleteContact , ContactCount, getAllContacts } from "../Controller/contactController.js";
 
const router = express.Router();

router.post("/", allContacts);
router.get("/getall",getAllContacts);
router.delete("/delete/:id",deleteContact);

//Total Counts of Contact
router.get("/getcounts",ContactCount);


export default router;
