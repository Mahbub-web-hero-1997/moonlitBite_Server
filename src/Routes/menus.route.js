import { Router } from "express";
import { createMenu, getAllMenus, GetMenuById } from "../Controllers/menus.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const router = new Router();

router.route("/all").get(getAllMenus);
router.route("/create").post(upload.array("image"), createMenu);
router.route("/single/:id").patch(GetMenuById);

export default router;
