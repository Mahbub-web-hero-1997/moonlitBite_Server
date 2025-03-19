import { Router } from "express";
import { createBlog } from "../Controllers/blogs.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(upload.array("images",4), createBlog);

export default router;