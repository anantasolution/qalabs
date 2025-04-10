import express from "express";

import { allContacts, deleteContact , ContactCount, getAllContacts,getLatestcontact, sendMail } from "../Controller/contactController.js";
 
const router = express.Router();

router.post("/", allContacts);
router.get("/getall",getAllContacts);
router.delete("/delete/:id",deleteContact);

//Total Counts of Contact
router.get("/getcounts",ContactCount);

router.get("/latestcontact",getLatestcontact)

// To mail Each and Every Admin
router.post('/send-mail', sendMail);


export default router;
