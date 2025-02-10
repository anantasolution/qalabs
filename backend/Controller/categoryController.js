import mongoose from "mongoose";
import CATEGORY from "../models/CATEGORY.js";

export const createCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    if (!category_name || category_name.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid category name array." });
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
    const category = await CATEGORY.find().populate("blogs");

    if (category.length === 0)
      return res.status(404).json({ message: "No Category found" });

    return res.status(200).json({ message: "All category", category });
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
