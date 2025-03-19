import { Router } from "express";
import { createBlog, getAllBlogs } from "../Controllers/blogs.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(upload.array("images",4), createBlog);
router.route("/all").get(getAllBlogs)

export default router;