import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import CONTACTS from "../models/CONTACTS.js";
import Admin from "../models/ADMIN.js";

export const allContacts = async (req, res, next) => {
  try {
    const { name, company, phone, email, subject, message } = req.body;
    if (!name || !company || !phone || !email || !subject || !message)
      return res.status(404).json({ message: "Entre all the fields" });

    const newContact = new CONTACTS({ name, company, phone, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Contact created successfully", contact: newContact });

  } catch (err) {
    next(err);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await CONTACTS.find();

    if (!contacts) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json({
      message: "Contacts fetched successfully",
      contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    const contact = await CONTACTS.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "No contact found with this ID" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const ContactCount = async (req, res, next) => {
  try {
    const count = await CONTACTS.countDocuments(); // Correct way to get count

    if (count === 0)
      return res.status(404).json({ message: "No contact found" });

    return res.status(200).json({ message: "contact count", data: count });
  } catch (err) {
    next(err);
  }
};


export const getLatestcontact = async (req, res) => {
  try {
    const blogs = await CONTACTS.find()
      .sort({ createdAt: -1 }) // Sort by descending order of createdAt
      .limit(10); 

    if (!blogs) {
      return res.status(202).json({ message: "No contact Found", data: [] });
    }

    return res
      .status(200)
      .json({ success: true, message: "Latest  contact", data: blogs });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error from GetLatestBlogs",
      error: err.message,
    });
  }
};


// to send mail to all admins when form is submitted...
export const sendMail = async (req, res) => {
  try {
    const {formData} = req.body;

    console.log("form submitted")

    const toEmail = ['kinjal@zyinexweb.com','mihir@zyinexweb.com','vivekmesuriya110@gmail.com']


    const emailBody = `
      <h2>New Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `;

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
    

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: toEmail,
      subject: "New Form Submission",
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
};

