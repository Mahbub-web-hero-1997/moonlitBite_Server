import dotenv from "dotenv";
import ConnectionDb from "./DB/ConnectionDb.js";
import app from "./app.js";

dotenv.config();
await ConnectionDb();

export default app; // ✅ This is a must for Vercel
