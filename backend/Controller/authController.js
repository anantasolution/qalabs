import bcryptjs from "bcryptjs";
import Admin from "../models/ADMIN.js";
import Loginmapping from "../models/LOGINMAPPING.js";

export const createAdmin = async (req, res) => {
  try {
    const { username, email, mobileno, password } = req.body;

    // Validate input
    const { isValid, errors } = validateAdmin(
      username,
      email,
      password,
      mobileno
    );
    if (!isValid) {
      return res.status(400).json({
        message: "Some fields are missing or invalid",
        errors: errors,
      });
    }

    // Check if admin already exists
    const adminavailable = await Admin.findOne({ email });
    if (adminavailable) {
      return res
        .status(409)
        .json({ message: "Admin already exists with this email" });
    }

    // Hash password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    // Create new Admin
    const newAdmin = new Admin({ username, email, mobileno, password: hash });
    await newAdmin.save();

    // Create login mapping
    const newLoginMapping = new Loginmapping({
      mongoid: newAdmin._id,
      password: hash,
      email,
      user_type: "admin",
    });
    await newLoginMapping.save();

    return res.status(201).json({
      message: "Admin created successfully",
      Admin: newAdmin,
      Loginmapping: newLoginMapping,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong while creating admin",
      error: e.message,
    });
  }
};

// Validation function
const validateAdmin = (username, email, password, mobileno) => {
  const errors = [];

  if (!username || username.length < 3) {
    errors.push("Invalid username, must be at least 3 characters.");
  }

  const emailRegX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegX.test(email)) {
    errors.push("Invalid email format.");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  const mobileRegx = /^\d{10}$/;
  if (!mobileno || !mobileRegx.test(mobileno)) {
    errors.push("Invalid mobile number format. Must be 10 digits.");
  }

  return { isValid: errors.length === 0, errors };
};
