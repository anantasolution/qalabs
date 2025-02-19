import bcrypt from "bcryptjs";
import Admin from "../models/ADMIN.js";
import Loginmapping from "../models/LOGINMAPPING.js";
import jwt from "jsonwebtoken";

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
export const validateAdmin = (username, email, password, mobileno) => {
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
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await Loginmapping.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email address is incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        mongoid: user.mongoid,
        email: user.email,
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );


    res.cookie("qalabs", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
        domain:process.env.NODE_ENV === 'production'?'.stylic.ai':undefined,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      }).status(200)
      .json({ email:user.email, mongoid:user.mongoid });

  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { id, newpassword } = req.body;

    if (!id || !newpassword) {
      return res
        .status(400)
        .json({ message: "Please provide user id and new password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    // Update the password using `findOneAndUpdate`
    const updatedUser = await Loginmapping.findOneAndUpdate(
      { mongoid: id },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const logoutAdmin = async (req, res, next) => {
  try {
    res
      .clearCookie("qalabs", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain:
          process.env.NODE_ENV === "production" ? ".stylic.ai" : undefined,
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};


export const validateUser = async (req, res, next)=>{
  try{
    const token= req.cookies.qalabs

    if (!token) return res.status(401).json({ message: "No token found." });

    const decoded = jwt.verify(token, process.env.JWT);

    const user = await Loginmapping.findOne({ mongoid: decoded.mongoid });

    if (!user) return res.status(401).json({ message: "User not found." });

    const { email, mongoid } = user._doc;
    res.status(200).json({ email, mongoid });
  }catch(err){
     next(err)
  }
}