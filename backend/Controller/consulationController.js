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
    const formData = req.body;

    // Get all admin emails
    const admins = await Admin.find({});
    if (admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }

    const toEmail = admins[0].email;
    const ccEmails = admins.slice(1).map((admin) => admin.email);

    const emailBody = `
      <h2>Consultation Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_USERNAME,
        pass: process.env.USER_APP_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: toEmail,
      cc: ccEmails,
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