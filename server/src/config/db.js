import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected."),
    );
    await mongoose.connect(`${ENV.MONGO_URI}`);
  } catch (error) {
    console.error(error);
  }
};
