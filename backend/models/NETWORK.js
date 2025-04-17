import mongoose from "mongoose";

const networkSchema = new mongoose.Schema(
    {
        Count: {
            type: String,
            required: true,
        },
        Title: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
    }
);


const Network = mongoose.model("network", networkSchema);

export default Network;
