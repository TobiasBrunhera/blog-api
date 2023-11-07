import mongoose from "mongoose";

export const mongoConnection = async () => {
    await mongoose.connect(process.env.MONGO_URL as string)
}