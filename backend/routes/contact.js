import express from "express";

import { allContacts, deleteContact , ContactCount, getAllContacts,getLatestcontact } from "../Controller/contactController.js";
 
const router = express.Router();

router.post("/", allContacts);
router.get("/getall",getAllContacts);
router.delete("/delete/:id",deleteContact);

//Total Counts of Contact
router.get("/getcounts",ContactCount);

router.get("/latestcontact",getLatestcontact)


export default router;
