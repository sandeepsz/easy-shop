import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect with database on: " + conn.connection.host);
  } catch (error) {
    console.log("Connection error to db", error.mesaage);
    process.exit(1);
  }
};
