import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    reviewMessage: {
      type: String,
      required: true,
    },
    profilePicture: {
      filetype: String,
      filename: String,
      filepath: String,
      fileSize: String, // URL or path to the profile picture
    },
  },
  { timestamps: true }
); // ✅ Adds createdAt and updatedAt timestamps

export default mongoose.model("Feedback", feedbackSchema);
