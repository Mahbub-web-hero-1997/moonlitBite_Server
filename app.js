import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173, https://moonlit-bites.vercel.app/",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import menuRoutes from "./src/Routes/menus.route.js";
import reviewRoutes from "./src/Routes/reviews.route.js";
import blogRoutes from "./src/Routes/blogs.route.js";
import userRoutes from "./src/Routes/user.route.js";
import cartRoutes from "./src/Routes/cart.route.js";
import paymentRoutes from "./src/Routes/payment.route.js";
import orderRoutes from "./src/Routes/order.route.js";
import storyRoutes from "./src/Routes/story.route.js";
import partyRoutes from "./src/Routes/party.route.js";
import expertRoutes from "./src/Routes/expert.route.js";

// import userRoutes from "./Routes/users.route.js"
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/party", partyRoutes);
app.use("/api/v1/expert", expertRoutes);

export default app;
