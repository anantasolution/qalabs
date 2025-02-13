import mongoose from "mongoose";
import CATEGORY from "../models/CATEGORY.js";

export const createCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;

    const name = category_name.trim().LowerCase();
    if (!category_name || category_name.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid category name array." });
    }

    const checkAlreadyExists = await CATEGORY.find({ category_name: name });

    if (checkAlreadyExists) {
      return res.status(400).json({
        message: "Category already exists Please Create New Category",
        data: [],
        alreadyExistsName: checkAlreadyExists,
      });
    }

    const newCategory = new CATEGORY({ category_name });
    await newCategory.save();
    return res
      .status(200)
      .json({ message: "Category craeted successfully", category_name });
  } catch (err) {
    next(err);
  }
};

export const delCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Entre a valid ID" });

    const delcategory = await CATEGORY.findByIdAndDelete(id);
    if (!delcategory)
      return res.status(404).json({ message: "Category not deleted" });
    return res
      .status(200)
      .json({ message: "Category deleted successfully", delcategory });
  } catch (err) {
    next(err);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await CATEGORY.find()
      .populate("blogs")
      .sort({ updatedAt: -1 });

    if (category.length === 0)
      return res.status(404).json({ message: "No Category found" });

    return res.status(200).json({ message: "All category", data: category });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Entre a valid Id" });
    const getByid = await CATEGORY.findById(id);
    if (!getByid) return res.status(404).json({ message: "Id is not found" });

    return res.status(200).json({ message: "fetched Successfully", getByid });
  } catch (err) {
    next(err);
  }
};

export const getTrendingBlogs = async (req, res) => {
  try {
    const categories = await CATEGORY.aggregate([
      {
        $match: { $expr: { $gt: [{ $size: "$blogs" }, 1] } },
      },
      {
        $lookup: {
          from: "blogs",
          let: { blogsIds: "$blogs" },
          pipeline: [
            {
              $match: { $expr: { $in: ["$_id", "$$blogsIds"] } },
            },
            {
              $project: {
                title: 1,
                content: 1,
                image: 1,
                createdAt: 1,
              },
            },
          ],
          as: "blogs_details",
        },
      },
    ]);
    if (categories.length === 0)
      return res.status(404).json({ message: "No Trending Blogs found" });

    return res
      .status(200)
      .json({ message: "Trending Blogs", data: categories });
  } catch (err) {
    return res.status(404).json({
      message: "SomethingWent Wrong in GetTrendingBlogs",
      message2: err.message,
    });
  }
};

export const CategoryCount = async (req, res, next) => {
  try {
    const count = await CATEGORY.countDocuments(); // Correct way to get count

    if (count === 0)
      return res.status(404).json({ message: "No categories found" });

    return res.status(200).json({ message: "Category count", data: count });
  } catch (err) {
    next(err);
  }
};
