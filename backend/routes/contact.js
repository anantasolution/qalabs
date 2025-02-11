import express from "express";


import { allContacts, getAllContacts } from "../Controller/contactController.js";


const router = express.Router();

router.post("/", allContacts);
router.get("/getall",getAllContacts)


export default router;
