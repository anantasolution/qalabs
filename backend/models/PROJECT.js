import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      filetype: String,
      filename: String,
      filepath: String,
      fileSize: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("PROJECT", projectSchema);
