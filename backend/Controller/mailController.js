import Admin from "../models/ADMIN.js";
import Loginmapping from "../models/LOGINMAPPING.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
dotenv.config();

console.log(process.env.USER_MAIL, process.env.USER_APP_PASS);
const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth: {
    user:process.env.USER_MAIL, // your Gmail address
    pass:process.env.USER_MAIL     // your Gmail app password (not your main Gmail password)
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
      from:process.env.USER_MAIL,
      to: email, // Send email to this fixed recipient
      subject: "Password Reset Request",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reset Your Password - Zyinexweb Pvt Ltd</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            background-color: black;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            color: #000;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            margin-top: 20px;
          }
          .content p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            background-color: #70ecb6;
            color: #000;
            padding: 12px 24px;
            margin: 20px 0;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 13px;
            color: #888;
          }
        </style>
      </head>
      <body>
      
        <div class="container">
          <div class="header">
            <img src="https://res.cloudinary.com/djxavfpqc/image/upload/v1745227683/navlogo_cuoecd.png" alt="Zyinexweb Logo" width="120" style="display:block; margin: 0 auto 10px;" />
          </div>
          <div class="content">
            <p>Hello,</p>
      
            <p>We received a request to reset your password for your account associated with this email address. If you made this request, you can reset your password by clicking the button below:</p>
      
            <p style="text-align: center;">
              <a href="${process.env.FRONT_URL}/verify-token/${token}" class="button">Reset Your Password</a>
            </p>
      
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
      
            <p>Thank you,<br>
            The Zyinexweb Team</p>
          </div>
          <div class="footer">
            ©️ 2025 Zyinexweb Pvt Ltd. All rights reserved.
          </div>
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
