import CONTACTS from "../models/CONTACTS.js";

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
