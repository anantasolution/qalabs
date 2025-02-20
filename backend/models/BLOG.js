import mongoose from "mongoose";

const blog = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      index: "text",
    },
    image: {
      filetype: String,
      filename: String,
      filepath: String,
      fileSize: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blog);
export default Blog;
