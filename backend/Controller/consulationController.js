import nodemailer from "nodemailer";
import CONSULATIONS from "../models/CONSULATIONS.js";
import Admin from "../models/ADMIN.js";

export const allConsulations = async (req, res, next) => {
  try {
    const { name, phone, company, email, message } = req.body;
    if (!name || !phone || !company || !email || !message)
      return res.status(404).json({ message: "Entre All the fields" });
    const newConsulation = new CONSULATIONS({
      name,
      company,
      phone,
      email,
      message,
    });
    await newConsulation.save();

    res.status(201).json({
      message: "Consulation created successfully",
      Consulation: newConsulation,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllConsultations = async (req, res, next) => {
  try {
    const consultations = await CONSULATIONS.find();

    if (!consultations) {
      return res.status(404).json({ message: "No consultations found" });
    }

    res.status(200).json({
      message: "Consultations fetched successfully",
      consultations,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "Consultation ID is required" });
    }

    const consultations = await CONSULATIONS.findByIdAndDelete(id);

    if (!consultations) {
      return res.status(404).json({ message: "No consultation found with this ID" });
    }

    res.status(200).json({ message: "Consultation deleted successfully" });
  }catch(err){
    next(err);
  }
}

export const ConsulationCount = async (req, res, next) => {
  try {
    const count = await CONSULATIONS.countDocuments(); // Correct way to get count

    if (count === 0)
      return res.status(404).json({ message: "No consulation found" });

    return res.status(200).json({ message: "consulation count",  data: count  });
  } catch (err) {
    next(err);
  }
};

// to send mail to all admins when consulatation form is submitted
export const sendMail = async (req, res) => {
  try {
    const {formData} = req.body;

    const toEmail = ['kinjal@zyinexweb.com','mihir@zyinexweb.com','vivekmesuriya110@gmail.com']

    const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New User Consultant - Zyinexweb Pvt Ltd</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }
        .container {
          background-color: #f2f2f2;
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
        .content {
          margin-top: 20px;
        }
        .content h2 {
          color: #333;
          font-size: 20px;
          margin-bottom: 10px;
        }
        .info {
          margin: 10px 0;
          font-size: 16px;
          color: #777;
          padding-bottom: 10px;
        }
        .info strong {
          color: #000;
        }
        .intro-text {
          font-size: 15px;
          margin-bottom: 20px;
          line-height: 1.6;
          color: #777;
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
          <div class="intro-text">
            Hello Admin,<br><br>
            You have received a new inquiry from a user via the website consultant form. Below are the details of the submission:
          </div>
          <h2>User Details</h2><br>
          <div class="info"><strong>Name:</strong> ${formData.name}</div>
          <div class="info"><strong>Company:</strong> ${formData.company}</div>
          <div class="info"><strong>Phone:</strong> ${formData.phone}</div>
          <div class="info"><strong>Email:</strong> ${formData.email}</div>
          <div class="info"><strong>Message:</strong><br><br>${formData.message}</div>
        </div>
        <div class="footer">
          ©️ 2025 Zyinexweb Pvt Ltd. All rights reserved.<br>
          This is an automated notification from your website.
        </div>
      </div>
    
    </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_USERNAME,
        pass: process.env.USER_APP_PASS,
      },
    });
    

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: toEmail,
      subject: "New Consultation Form Submission",
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
};