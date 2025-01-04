const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
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
    const blogsCollection = client.db("Blogs").collection("blog");
    const bookingsCollection = client.db("Bookings").collection("booking");

    //   ********************************************************************
    //                     JWT Related api Here
    //   ********************************************************************

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_tOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    //   ********************************************************************
    //                    Verify Token api
    //   ********************************************************************

    const verifyToken = (req, res, next) => {
      // console.log({ Message: req.headers.authorization });
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "UnAuthorized Access" });
      }
      const token = req.headers.authorization?.split(" ")?.[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send("Forbidden");
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return req.status(403).send({ message: "Forbidden Access" });
      }
      next();
    };
    //   ********************************************************************
    //                     Bookings Collection api Here
    //   ********************************************************************
    app.get("/booking", async (req, res) => {
      const email = req.query.email;
      const query = { email }
      const result = await bookingsCollection.find(query).toArray()
      res.send(result)
    });
    app.get("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookingsCollection.findOne(filter)
      res.send(result);
    });

    app.post("/booking", verifyToken, async (req, res) => {
      const item = req.body;
      const result = await bookingsCollection.insertOne(item);
      res.send(result);
    });

    //   ********************************************************************
    //                     Blog Collection api Here
    //   ********************************************************************
    app.get("/blogs", async (req, res) => {
      const cursor = blogsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/blogs", verifyToken, async (req, res) => {
      const blog = req.body;
      const result = await blogsCollection.insertOne(blog);
      res.send(result);
    });
    //   ********************************************************************
    //                     Menu Collection api Here
    //   ********************************************************************
    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const menu = req.body;
      const result = await menuCollections.insertOne(menu);
      res.send(result);
    });
    app.get("/menu", async (req, res) => {
      const cursor = menuCollections.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollections.findOne(query);
      res.send(result);
    });

    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await menuCollections.deleteOne(filter);
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
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // User Api
    app.get("/user", verifyToken, verifyAdmin, async (req, res) => {
      //  console.log(req.headers);
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/user", verifyToken, verifyAdmin, async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User Already Exist", insertedId: null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    app.delete("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    app.patch("/user/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDocs = {
        $set: { role: "admin" },
      };
      const result = await usersCollection.updateOne(filter, updatedDocs);
      res.send(result);
    });
    app.get("/user/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      // console.log(req.decoded);
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "Unauthorized Access" });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
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
