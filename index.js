const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express());
app.use(cors());
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const storyCollections = client.db("Stories").collection("Story");
    const partyCollections = client.db("Parties").collection("Party");
    const expertsCollection = client.db("Experts").collection("Expert");
    const reviewsCollection = client.db("Reviews").collection("Review");
    const cartCollection = client.db("CartItem").collection("cart");
    const usersCollection = client.db("Users").collection("user");

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
    //                    Story Api
    //   ********************************************************************

    app.post("/story", async (req, res) => {
      const story = req.body;
      const result = await storyCollections.insertOne(story);
      res.send(result);
    });
    app.get("/story", async (req, res) => {
      const cursor = storyCollections.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Party Api Here
    app.post("/party", async (req, res) => {
      party = req.body;
      const result = await partyCollections.insertOne(party);
      res.send(result);
    });
    app.get("/party", async (req, res) => {
      const cursor = partyCollections.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Experties Api Here
    app.post("/expert", async (req, res) => {
      expert = req.body;
      const result = await expertsCollection.insertOne(expert);
      res.send(result);
    });
    app.get("/expert", async (req, res) => {
      const cursor = expertsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Reviews Api
    app.post("/review", async (req, res) => {
      const reviews = req.body;
      const result = await reviewsCollection.insertOne(reviews);
      res.send(result);
    });
    app.get("/review", async (req, res) => {
      const cursor = reviewsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Cart Api
    app.post("/cart", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });
    app.get("/cart", async (req, res) => {
      const email = req.query.email;
      const query = { email: email }
      const result = await cartCollection.find(query).toArray()
        res.send(result)
      
    })
    app.delete("/cart/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result= await cartCollection.deleteOne(query)
      res.send(result)
      
    })

    // User Api
    app.get("/user", async (req, res) => {
      const cursor = usersCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    app.post("/user", async (req, res) => {
      const user = req.body;
      const query = {email:user.email}
      const existingUser = await usersCollection.findOne(query)
      if (existingUser) {        
        return res.send({ message: "User Already Exist", insertedId:null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("This port Listening in Port :", port);
});
