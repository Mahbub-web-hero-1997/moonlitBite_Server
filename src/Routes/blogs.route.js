import { Router } from "express";
import { createBlog, getAllBlogs, getSingleBlog } from "../Controllers/blogs.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(upload.array("images",4), createBlog);
router.route("/all").get(getAllBlogs)
router.route("/single/:id").get(getSingleBlog);

export default router;