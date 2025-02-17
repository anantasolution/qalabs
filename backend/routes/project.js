import express from "express";
import multer from "multer";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../Controller/projectController.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/project/photos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/createproject", upload.single("photo"), createProject);
router.get("/getallprojects", getAllProjects);
router.get("/getproject/:id", getProjectById);
router.put("/updateproject/:id", upload.single("photo"), updateProject);
router.delete("/deleteproject/:id", deleteProject);

export default router;
