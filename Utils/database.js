
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://manu:manu@cluster0.dlmph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error)
    }
};

