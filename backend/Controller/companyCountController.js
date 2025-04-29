import CompanyCount from "../models/COMPANYCOUNT.js";

// To get company counts...
export const getCompanyCount = async (req, res) => {
    try {
      console.log("Fetching company count...");
      const count = await CompanyCount.findOne();
  
      res.status(200).json(count);
    } catch (error) {
      console.error("Error in getCompanyCount:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  };
  


// To create Counts
export const createCompanyCount = async (req, res) => {
    try {
        const { ProjectDone, HappyClients, ClientReviews } = req.body;

        // Check if already exists (to avoid multiple docs)
        const existing = await CompanyCount.findOne();
        if (existing) {
            return res.status(400).json({ message: "Count already exists. Use update route instead." });
        }

        const newCount = new CompanyCount({
            ProjectDone,
            HappyClients,
            ClientReviews,
        });

        const savedCount = await newCount.save();
        res.status(201).json(savedCount);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// To update company counts...
export const updateCompanyCount = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProjectDone, HappyClients, ClientReviews } = req.body;

        const updatedCount = await CompanyCount.findByIdAndUpdate(
            id,
            { ProjectDone, HappyClients, ClientReviews },
            { new: true, runValidators: true }
        );

        if (!updatedCount) {
            return res.status(404).json({ message: "Count data not found" });
        }

        res.status(200).json(updatedCount);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
