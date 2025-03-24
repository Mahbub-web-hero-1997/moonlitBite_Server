import { Router } from "express";
import { registerUser, loginUser } from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";


const router = new Router();
router.route("/register").post(
    upload.single("avatar")
    ,registerUser)
    router.route("/login").post(loginUser)

export default router;

