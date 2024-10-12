const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express());
app.use(cors());
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MOONLIT_DB_USER}:${process.env.MOONLIT_DB_PASS_CODE}@cluster0.zxzg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menuCollections = client.db("Menus").collection("Menu");
    const categoryCollection = client.db("Categories").collection("Category");
    //   ********************************************************************
    //                     Menu Collection api Here
    //   ********************************************************************
    app.post("/menu", async (req, res) => {
      const menu = req.body;
      const result = await menuCollections.insertOne(menu);
      res.send(result);
    });
    app.get("/menu", async (req, res) => {
      const cursor = menuCollections.find();
      const result = await cursor.toArray();

      res.send(result);
    });
    //   ********************************************************************
    //                    Pagination
    //   ********************************************************************
    app.get("/pagination", async (req, res) => {
      const totalItems = await menuCollections.estimatedDocumentCount();
      res.send({ totalItems });
    });
    //   ********************************************************************
    //                    Category Api
    //   ********************************************************************
    app.post("/category", async (req, res) => {
      const category = req.body;
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    });
    app.get("/category", async (req, res) => {
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("This port Listening in Port :", port);
});
