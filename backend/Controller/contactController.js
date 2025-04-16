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
          background-color: #70ecb6;
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
          <h1>Zyinexweb Pvt Ltd</h1>
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
          <div class="info"><strong>Subject:</strong> ${formData.subject}</div>
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
      host: "smtp.gmail.com", // Replace with your SES SMTP endpoint
      port: 587, // For secure connection
      secure: false, // Use TLS
      auth: {
        user: process.env.USER_USERNAME, // SES SMTP username
        pass: process.env.USER_APP_PASS, // SES SMTP password
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

