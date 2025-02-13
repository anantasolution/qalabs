import mongoose from "mongoose";
import { type } from "os";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
