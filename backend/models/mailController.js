import Admin from "./ADMIN.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// import Admin from "./models/Admin";
import dotenv from "dotenv";
dotenv.config();

// // Send email with the token link
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: "prentice.ryerson@filesaved.org",
//     pass: "zurbk6Q&",
//   },
// });

// Create a transporter using Gmail with minimal authentication
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "darshilp200300@gmail.com",
    pass: "urvuqvcmjcuicevq", // Use an App Password if 2FA is enabled
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
      from: "darshilp2000300@gmail.com",
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
            <a class="button" href="http://localhost:8080/verify-token/${token}">Reset Password</a>
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
