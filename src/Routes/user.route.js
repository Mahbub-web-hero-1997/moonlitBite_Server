import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  updateProfilePicture,
} from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = new Router();
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/update/:id").patch(upload.single("avatar"), updateProfilePicture);
router.route("/all").get(getAllUsers);

export default router;
