import bcrypt from "bcrypt";
import Admin from "../models/ADMIN.js";
import Loginmapping from "../models/LOGINMAPPING.js";
import jwt from 'jsonwebtoken';


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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
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


export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await Loginmapping.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email address" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      console.log("Password comparison failed");
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        mongoid: user.mongoid,
        email: user.email,
        user_type: user.user_type,
      },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        mongoid: user.mongoid,
        email: user.email,
        user_type: user.user_type,
        status: user.status,
      },
    });

  } catch (err) {
    next(err);
  }
};


