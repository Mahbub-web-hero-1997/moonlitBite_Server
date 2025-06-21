import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  GetMenuById,
  updateMenu,
} from "../Controllers/menus.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import authorizeRole from "../Middlewares/authorizeRole.js";
import verifyToken from "../Middlewares/verifyToken.js";

const router = new Router();

router.route("/all").get(getAllMenus);

router
  .route("/create")
  .post(
    verifyToken,
    upload.array("image", 4),
    authorizeRole("admin"),
    createMenu
  );

router
  .route("/single/:id")
  .get(verifyToken, authorizeRole("admin", "user"), GetMenuById);

router
  .route("/update/:id")
  .patch(
    verifyToken,
    upload.array("image"),
    authorizeRole("admin"),
    updateMenu
  );

router
  .route("/delete/:id")
  .delete(verifyToken, authorizeRole("admin"), deleteMenu);

export default router;
