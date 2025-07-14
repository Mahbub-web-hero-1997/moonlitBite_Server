import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://moonlitbite-server.onrender.com",
];

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files
app.use(express.static("./public/"));

// Cookie parser
app.use(cookieParser());

// Import your route files
import menuRoutes from "./Routes/menus.route.js";
import reviewRoutes from "./Routes/reviews.route.js";
import blogRoutes from "./Routes/blogs.route.js";
import userRoutes from "./Routes/user.route.js";
import cartRoutes from "./Routes/cart.route.js";
// import paymentRoutes from "./Routes/payment.route.js";
import orderRoutes from "./Routes/order.route.js";
import storyRoutes from "./Routes/story.route.js";
import partyRoutes from "./Routes/party.route.js";
import expertRoutes from "./Routes/expert.route.js";

import ApiResponse from "./Utils/ApiResponse.js";

// Mount your routes
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
// app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/party", partyRoutes);
app.use("/api/v1/expert", expertRoutes);

// Root endpoint
app.get("/", (req, res) => {
  const response = "MoonLit-Bites API is running";
  res
    .status(200)
    .json(new ApiResponse(200, response, "Server Running Successfully"));
});

export default app;
