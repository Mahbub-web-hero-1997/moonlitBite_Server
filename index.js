import dotenv from "dotenv";
import ConnectionDb from "./DB/ConnectionDb.js";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT;

ConnectionDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to the database", err));
