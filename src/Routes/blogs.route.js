import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "../Controllers/blogs.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(upload.array("images", 4), createBlog);
router.route("/all").get(getAllBlogs);
router.route("/single/:id").get(getSingleBlog);
router.route("/update/:id").patch(upload.array("images", 4), updateBlog);
router.route("/delete/:id").delete(deleteBlog);

export default router;
