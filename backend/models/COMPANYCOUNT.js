import mongoose from "mongoose";

const countSchema = new mongoose.Schema(
    {
        ProjectDone: {
            type: String,
            required: true,
        },
        HappyClients: {
            type: String,
            required: true,
        },
        ClientReviews: {
            type: String,
            required: true,
        },
    }
);


const CompanyCount = mongoose.model("companyCount", countSchema);

export default CompanyCount;
