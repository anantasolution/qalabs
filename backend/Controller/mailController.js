import Admin from "../models/ADMIN.js";
import Loginmapping from "../models/LOGINMAPPING.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
dotenv.config();

// Send email with the token link

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com", // Replace with your SES SMTP endpoint
  port: 587, // For secure connection
  secure: false, // Use TLS
  auth: {
    user: process.env.USER_USERNAME, // SES SMTP username
    pass: process.env.USER_APP_PASS, // SES SMTP password
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// Function to handle forgot password logic
export const sendVerificationMail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Create a JWT token with the user's _id
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "30m",
    });

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: email, // Send email to this fixed recipient
      subject: "Password Reset Request",
      html: `
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
            .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
            .button { background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset Request</h2>
            <p>Hello,</p>
            <p>Click the button below to reset your password:</p>
            <a class="button" href="${process.env.FRONT_URL}/verify-token/${token}">Reset Password</a>
            <p>If you didn't request this, ignore this email.</p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Password reset link sent successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
};

// Function to verify the token and reset password
export const verifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    //     // verify the token using jwt
    const decoded = jwt.verify(token, process.env.JWT); // Make sure you're using the correct secret
    //     // Find the user by decoded id
    const user = await Admin.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: false });
    }
    //     // Token verified successfully
    return res.status(200).json({
      message: "Token verified successfully",
      data: true,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

// reset the password thing...

export const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await Admin.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Also update the password in loginmapping
    const loginRecord = await Loginmapping.findOne({ mongoid: id });
    if (loginRecord) {
      loginRecord.password = hashedPassword;
      await loginRecord.save();
    }

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
