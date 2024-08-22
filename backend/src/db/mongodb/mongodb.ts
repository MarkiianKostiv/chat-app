import { connect } from "mongoose";

export default async function mongooseConnect(): Promise<void> {
  try {
    const mongoDBURI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
    await connect(mongoDBURI);
    console.log("Database connected successfully!");
  } catch (error: any) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  }
}
