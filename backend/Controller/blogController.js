import Blog from "../models/BLOG.js";
import Category from "../models/CATEGORY.js";
import fs from "fs";
import path from "path";

// create  a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!category || !title || !content) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all the required fields category or content or title is missing",
      });
    }

    // Use req.files, not req.file (since you're using multiple upload middlewares)
    const image = req.files["image"] ? req.files["image"][0] : null;
    // const contentImage = req.files["contentImage"]
    //   ? req.files["contentImage"][0]
    //   : null;
    const imageFormat = image
      ? {
          filetype: image.mimetype,
          filepath: image.path,
          filename: image.filename,
          fileSize: `${image.size} bytes`,
        }
      : null;

    // const contentImageFormat = contentImage
    //   ? {
    //       filetype: contentImage.mimetype,
    //       filepath: contentImage.path,
    //       filename: contentImage.filename,
    //       fileSize: `${contentImage.size} bytes`,
    //     }
    //   : null;

    const newBlog = await Blog.create({
      title,
      content,
      category,
      ...(image ? { image: imageFormat } : {}), // Corrected condition for spreading
    });

    const addBlogToTheCategory = await Category.findByIdAndUpdate(
      category,
      { $push: { blogs: newBlog._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Blog Created",
      data: newBlog,
      category: addBlogToTheCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from create blog",
      error: err.message,
    });
  }
};

// get All Blogs
export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category");

    if (!blogs) {
      return res.status(202).json({ message: "No Blogs Found", data: [] });
    }

    return res
      .status(200)
      .json({ success: true, message: "All Blogs", data: blogs });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from GetAllblog",
      error: err.message,
    });
  }
};
// get Specific Blog
export const getSpecificBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide id",
      });
    }
    const blog = await Blog.findById(id).populate("category");
    if (!blog) {
      return res.status(202).json({ message: "No Blog Found", data: [] });
    }
    return res
      .status(200)
      .json({ success: true, message: "Specific Blog", data: blog });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from GetSpecificblog",
      error: err.message,
    });
  }
};
// update Blog

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide id",
      });
    }

    // Fetch the old blog data
    const oldBlog = await Blog.findById(id);
    if (!oldBlog) {
      return res.status(404).json({ success: false, message: "No Blog Found" });
    }

    // Handle image update
    if (req.files?.image) {
      if (oldBlog.image?.filepath) {
        // Delete the old image file
        fs.unlink(oldBlog.image.filepath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }

      updatedData.image = {
        filetype: req.files.image[0].mimetype,
        filepath: req.files.image[0].path,
        filename: req.files.image[0].filename,
        fileSize: `${req.files.image[0].size} bytes`,
      };
    }

    // Handle content image update
    // if (req.files?.contentImage) {
    //   if (oldBlog.contentImage?.filepath) {
    //     // Delete the old content image file
    //     fs.unlink(oldBlog.contentImage.filepath, (err) => {
    //       if (err) console.error("Error deleting old content image:", err);
    //     });
    //   }

    //   updatedData.contentImage = {
    //     filetype: req.files.contentImage[0].mimetype,
    //     filepath: req.files.contentImage[0].path,
    //     filename: req.files.contentImage[0].filename,
    //     fileSize: `${req.files.contentImage[0].size} bytes`,
    //   };
    // }

    // Update the blog
    const blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "Blog Updated", data: blog });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from updateBlog",
      error: err.message,
    });
  }
};

// delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide id",
      });
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(202)
        .json({ message: "No Blog Found  this can not done", data: [] });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog Deleted", data: blog });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from deleteBlog",
      error: err.message,
    });
  }
};

export const updateImageofBlog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide image of Blog to update",
      });
    }
    console.log(req.file.image);
    const updatedImage = {
      filetype: req.file.mimetype,
      filepath: req.file.path,
      filename: req.file.filename,
      fileSize: `${req.file.size} bytes`,
    };
    const updatedblog = await Blog.findById(id, { image: updatedImage });

    return res
      .status(200)
      .json({ message: "blog Image updated successfully", data: updatedblog });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Internal Server Error from updateImageofBlog",
      error: error.message,
    });
  }
};
export const updateimageOfContentOfBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide Content image of Blog to update",
      });
    }
    // console.log(req.file.image);
    const updatedImage = {
      filetype: req.file.mimetype,
      filepath: req.file.path,
      filename: req.file.filename,
      fileSize: `${req.file.size} bytes`,
    };
    const updatedblog = await Blog.findById(id, { contentImage: updatedImage });

    return res
      .status(200)
      .json({ message: "blog Image updated successfully", data: updatedblog });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Internal Server Error from updateimageOfContentOfBlog",
      error: error.message,
    });
  }
};

//Top 5 blog
export const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by descending order of createdAt
      .limit(5); // Limit to 5 blogs

    if (!blogs) {
      return res.status(202).json({ message: "No Blogs Found", data: [] });
    }

    return res
      .status(200)
      .json({ success: true, message: "Latest  Blogs", data: blogs });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from GetLatestBlogs",
      error: err.message,
    });
  }
};

export const BlogCount = async (req, res, next) => {
  try {
    const count = await Blog.countDocuments(); // Correct way to get count

    if (count === 0) return res.status(404).json({ message: "No blog found" });

    return res.status(200).json({ message: "blog count", data: count });
  } catch (err) {
    next(err);
  }
};
