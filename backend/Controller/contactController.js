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
