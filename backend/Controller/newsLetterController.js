import NEWSLETTER from "../models/NEWSLETTER.js";


// Create newsletter
export const createNewsletter = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if email already exists
        const existingSubscriber = await NEWSLETTER.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "Email already subscribed" });
        }

        // Create new subscriber
        const newSubscriber = new NEWSLETTER({ name, email });
        await newSubscriber.save();

        res.status(201).json({ message: "Subscribed successfully", data: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all newsletters
export const getAllNewsletters = async (req, res) => {
    try {
        const subscribers = await NEWSLETTER.find();
        res.status(200).json({ data: subscribers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
