import express from "express";
import {
  createBlog,
  updateBlog,
  getAllBlog,
  getSpecificBlog,
  deleteBlog,
  updateImageofBlog,
  updateimageOfContentOfBlog,
  getLatestBlogs
} from "../Controller/blogController.js";
import {
  uploadBoth,
  uploadImageOfBlog,
  uploadContentImageOfBlog,
} from "../utils/storageMulter.js";

const router = express.Router();

// create Blog Route
router.post("/createBlog", uploadBoth, createBlog);
// Update Route
router.put("/updateBlog/:id", uploadBoth, updateBlog);
// Get All Blogs Route
router.get("/getAllBlog", getAllBlog);
// Get Specific Blog Route
router.get("/getSpecificBlog/:id", getSpecificBlog);
// Delete Blog Route
router.delete("/deleteBlog/:id", deleteBlog);
//Get latest 5 blogs
router.get("/latestblogs", getLatestBlogs);

// upadte the  Image of Blog
router.put(
  "/updateImageOfBlog/:id",
  uploadImageOfBlog.single("image"),
  updateImageofBlog
);
//update Image Of the Content of the Specific blog
router.put(
  "/updateimageOfContentOfBlog/:id",
  uploadContentImageOfBlog.single("contentImage"),
  updateimageOfContentOfBlog
);
export default router;
