import { Router } from "express";

import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../Controllers/cart.controller.js";
import verifyToken from "../Middlewares/verifyToken.js";
const router = Router();

router.route("/addToCart").post(verifyToken, addItemToCart);
router.route("/getItem").get(verifyToken, getCartByUserId);
router
  .route("/removeFromCart/:productId")
  .delete(verifyToken, removeItemFromCart);
router.route("/clearCart").delete(verifyToken, clearCart);

export default router;
