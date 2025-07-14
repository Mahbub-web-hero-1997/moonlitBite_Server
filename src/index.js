import dotenv from "dotenv";
import ConnectionDb from "./DB/ConnectionDb.js";
import app from "./app.js";

dotenv.config();

await ConnectionDb();

// ✅ Local dev only
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app; // ✅ Needed for Vercel serverless
