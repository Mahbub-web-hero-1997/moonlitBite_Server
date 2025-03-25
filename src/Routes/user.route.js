import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = new Router();
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser)

export default router;
