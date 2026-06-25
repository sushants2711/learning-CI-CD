import mongoose from "mongoose";

export const connectDB = async () => {

    if (!process.env.MONGO_URI) {
        throw new Error("Mongo URI is not defined")
    };

    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log(`DB Connected Successfully`))
            .catch((error) => console.log(`Error Occured from db, ${error.message}`));
    } catch (error) {
        throw new Error(error.message);
    };
};