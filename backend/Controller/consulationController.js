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

export const deleteConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "Consultation ID is required" });
    }

    const consultations = await CONSULATIONS.findByIdAndDelete(id);

    if (!consultations) {
      return res.status(404).json({ message: "No consultation found with this ID" });
    }

    res.status(200).json({ message: "Consultation deleted successfully" });
  }catch(err){
    next(err);
  }
}

export const ConsulationCount = async (req, res, next) => {
  try {
    const count = await CONSULATIONS.countDocuments(); // Correct way to get count

    if (count === 0)
      return res.status(404).json({ message: "No consulation found" });

    return res.status(200).json({ message: "consulation count",  data: count  });
  } catch (err) {
    next(err);
  }
};

