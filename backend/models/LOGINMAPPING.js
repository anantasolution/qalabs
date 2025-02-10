import mongoose from "mongoose";

const loginmapping = new mongoose.Schema(
  {
    mongoid: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "user_type",
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
      enum: ["admin", "partner", "company", "cmanager", "developer"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Loginmapping = mongoose.model("Loginmapping", loginmapping);
export default Loginmapping;
