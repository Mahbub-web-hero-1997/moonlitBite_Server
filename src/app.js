import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import menuRoutes from "./Routes/menus.route.js";
import reviewRoutes from "./Routes/reviews.route.js";
import blogRoutes from "./Routes/blogs.route.js";
import userRoutes from "./Routes/user.route.js";
import cartRoutes from "./Routes/cart.route.js";
import paymentRoutes from "./Routes/payment.route.js";
import orderRoutes from "./Routes/order.route.js";
import storyRoutes from "./Routes/story.route.js";

// import userRoutes from "./Routes/users.route.js"
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/story", storyRoutes);

export default app;
