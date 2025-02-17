import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../Controller/projectController.js";
import { uploadBoth, uploadImageOfProject } from "../utils/storageMulter.js";

const router = express.Router();

// Routes
router.post("/createproject", uploadImageOfProject, createProject);
router.get("/getallprojects", getAllProjects);
router.get("/getproject/:id", getProjectById);
router.put("/updateproject/:id", uploadImageOfProject, updateProject);
router.delete("/deleteproject/:id", deleteProject);

export default router;
