import { Router } from "express";
import {
  makeAnOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
} from "../Controllers/order.controller.js";
import verifyToken from "../Middlewares/verifyToken.js";
import authorizeRole from "../Middlewares/authorizeRole.js";

const router = Router();
router.route("/create").post(verifyToken, makeAnOrder);
router.route("/all").get(verifyToken, authorizeRole("admin"), getAllOrders);
router.route("/myOrder").get(verifyToken, getOrdersByUserId);
router
  .route("/update/:id/status")
  .patch(verifyToken, authorizeRole("admin"), updateOrderStatus);
router
  .route("/cancel/:id")
  .patch(verifyToken, authorizeRole("user"), cancelOrder);
router
  .route("/delete/:id")
  .delete(verifyToken, authorizeRole("admin"), deleteOrder);

export default router;
