import Network from "../models/NETWORK.js";

// Create a new network record
export const createNetwork = async (req, res) => {
    try {
        const { Count, Title, Description } = req.body;
        const newEntry = new Network({ Count, Title, Description });
        await newEntry.save();
        res.status(201).json({ message: "Network entry created", data: newEntry });
    } catch (error) {
        res.status(500).json({ message: "Error creating network entry", error });
    }
};

// Get all network records
export const getAllNetworks = async (req, res) => {
    try {
        const networks = await Network.find();
        res.status(200).json(networks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching network data", error });
    }
};

// Update a network record by ID
export const updateNetwork = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedNetwork = await Network.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedNetwork) {
            return res.status(404).json({ message: "Network entry not found" });
        }

        res.status(200).json({ message: "Network entry updated", data: updatedNetwork });
    } catch (error) {
        res.status(500).json({ message: "Error updating network entry", error });
    }
};

// Delete a network entry
export const deleteNetwork = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Network.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting entry", error });
    }
};
