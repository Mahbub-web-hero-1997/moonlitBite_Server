import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public/"))
app.use(express.urlencoded({ extended: true, limit:"16kb"}))
app.use(cookieParser())

import menuRoutes from "./Routes/menus.route.js"
import reviewRoutes from "./Routes/reviews.route.js"
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/reviews", reviewRoutes);




export default app