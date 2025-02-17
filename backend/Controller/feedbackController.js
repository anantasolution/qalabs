import FEEDBACK from "../models/FEEDBACK.js";

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const { name, designation, reviewMessage } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    const feedback = new FEEDBACK({
      name,
      designation,
      reviewMessage,
      profilePicture,
    });

    await feedback.save();
    res
      .status(201)
      .json({ message: "Feedback created successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error creating feedback", error });
    console.log(error);
  }
};

// Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FEEDBACK.find();
    res.status(200).json({message : "feedbacks fetched successfully.", data : feedbacks});
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await FEEDBACK.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

// Update feedback by ID
export const updateFeedback = async (req, res) => {
  try {
    const { name, designation, reviewMessage } = req.body;
    const profilePicture = req.file ? req.file.path : undefined; // Keep old picture if not updated

    const updatedFeedback = await FEEDBACK.findByIdAndUpdate(
      req.params.id,
      {
        name,
        designation,
        reviewMessage,
        ...(profilePicture && { profilePicture }), // Update only if new file is uploaded
      },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res
      .status(200)
      .json({ message: "Feedback updated successfully", updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await FEEDBACK.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error });
  }
};
