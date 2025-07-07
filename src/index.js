import dotenv from "dotenv";
import app from "./app.js";
import ConnectionDb from "./DB/ConnectionDb.js";

dotenv.config();
const port = process.env.PORT;

ConnectionDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to the database", err));
