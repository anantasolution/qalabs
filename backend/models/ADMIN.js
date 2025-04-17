import mongoose from "mongoose";

const admin = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username feild Required"],
    },
    email: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isPermanent: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", admin);
export default Admin;
