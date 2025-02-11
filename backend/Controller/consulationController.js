import express from "express";
import CONSULATIONS from "../models/CONSULATIONS.js";

export const allConsulations = async (req, res, next) => {
  try {
    const { name, phone, company, email, message } = req.body;
    if (!name || !phone || !company || !email || !message)
      return res.status(404).json({ message: "Entre All the fields" });
    const newConsulation = new CONSULATIONS({
      name,
      company,
      phone,
      email,
      message,
    });
    await newConsulation.save();

    res.status(201).json({
      message: "Consulation created successfully",
      Consulation: newConsulation,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllConsultations = async (req, res, next) => {
  try {
    const consultations = await CONSULATIONS.find();

    if (!consultations) {
      return res.status(404).json({ message: "No consultations found" });
    }

    res.status(200).json({
      message: "Consultations fetched successfully",
      consultations,
    });
  } catch (err) {
    next(err);
  }
};

