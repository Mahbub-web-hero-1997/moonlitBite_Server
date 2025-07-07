import mongoose from "mongoose";

const ConnectionDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.DATABASE_CONNECTION_URL
    );
    console.log("MongoDB Connected...", connectionInstance.connection.host);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default ConnectionDb;
