import { Router } from "express";

import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../Controllers/cart.controller.js";
const router = Router();

router.route("/addToCart").post(addItemToCart);
router.route("/getCart").get(getCartByUserId);
router.route("/removeFromCart/:productId").delete(removeItemFromCart);
router.route("/clearCart").delete(clearCart);

export default router;
