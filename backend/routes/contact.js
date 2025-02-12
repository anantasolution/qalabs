import express from "express";


import { allContacts, deleteContact, getAllContacts } from "../Controller/contactController.js";


const router = express.Router();

router.post("/", allContacts);
router.get("/getall",getAllContacts)
router.delete("/delete/:id",deleteContact);


export default router;
