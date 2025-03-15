import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public/"))
app.use(express.urlencoded({ extended: true, limit:"16kb"}))
app.use(cookieParser())

import router from "./Routes/menus.route.js"
app.use(router);



export default app