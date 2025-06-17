import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  updateProfilePicture,
  updateName,
  getCurrentUser,
} from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import verifyToken from "../Middlewares/verifyToken.js";

const router = new Router();
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyToken, logoutUser);
router
  .route("/update/:id")
  .patch(upload.single("avatar"), verifyToken, updateProfilePicture);
router.route("/update/name/:id").patch(verifyToken, updateName);
router.route("/all").get(verifyToken, getAllUsers);
router.route("/me").get(verifyToken, getCurrentUser);

export default router;
