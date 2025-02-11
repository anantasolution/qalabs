import express from "express";
import {
  getCategoryById,
  createCategory,
  getAllCategory,
  delCategoryById,
  getTrendingBlogs,
} from "../Controller/categoryController.js";

const router = express.Router();

// Get category by ID
router.get("/getbyId/:id", getCategoryById);

// Get all categories
router.get("/all", getAllCategory);

// Create a new category
router.post("/create", createCategory);

// Delete category by ID
router.delete("/delete/:id", delCategoryById);

// send the ternding Blogs of  the Category
router.get("/terndingBlogs", getTrendingBlogs);

export default router;
