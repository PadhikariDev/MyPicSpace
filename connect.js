// connect.js
import mongoose from "mongoose";

const connectMD = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};

export default connectMD;
