import dotenv from "dotenv";
import app from "./app.js";
import ConnectionDB from "./DB/ConnectionDb.js";

dotenv.config();
const port = process.env.PORT;

ConnectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to the database", err));
