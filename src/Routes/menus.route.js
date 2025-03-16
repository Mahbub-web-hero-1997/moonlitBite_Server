import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  GetMenuById,
  updateMenu,
} from "../Controllers/menus.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = new Router();

router.route("/all").get(getAllMenus);
router.route("/create").post(upload.array("image", 4), createMenu);
router.route("/single/:id").patch(GetMenuById);
router.route("/update/:id").patch(upload.array("image"), updateMenu);
router.route("/delete/:id").delete(deleteMenu);

export default router;
