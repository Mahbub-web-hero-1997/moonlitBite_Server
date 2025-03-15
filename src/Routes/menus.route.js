import { Router } from "express";
import { getAllMenus } from "../Controllers/menus.controller.js";

const router=new Router()

router.route("/menu").get(getAllMenus);

export default router;