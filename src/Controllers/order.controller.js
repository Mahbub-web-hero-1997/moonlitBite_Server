import Order from "../Models/order.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
// Create an order
const makeAnOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, address, phone } = req.body;
  const userId = req.user._id;
  if (
    [productId, quantity, address, phone].some(
      (field) => field.trim() === "" || field === undefined || field === null
    )
  ) {
    throw new ApiErrors(400, "All fields are required");
  }
  const product = await Menu.findById(productId);
  if (!product) {
    throw new ApiErrors(404, "Product not found");
  }
  const totalPrice = quantity * product.price;
  if (totalPrice <= 0) {
    throw new ApiErrors(400, "Total price must be greater than zero");
  }
  const order = await Order.create({
    userId,
    productId,
    quantity,
    totalPrice,
    address,
    phone,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});
// Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("productId", "name price image");
  if (!orders || orders.length === 0) {
    throw new ApiErrors(404, "No orders found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});
// Get orders by user ID
const getOrdersByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ApiErrors(400, "User ID is required");
  }
  const orders = await Order.find({ userId }).populate(
    "productId",
    "name price image"
  );
  if (!orders || orders.length === 0) {
    throw new ApiErrors(404, "No orders found for this user");
  }
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    throw new ApiErrors(400, "Invalid status");
  }
  const update = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!update) {
    throw new ApiErrors(404, "Order not found");
  }
  res.status(200).json(new ApiResponse(200, update, "Order status updated"));
});
// deleteOrder
const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiErrors(404, "Order not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, deleted, "Order deleted successfully"));
});
// cancel order by user (only their own orders)
const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const order = await Order.findById(id);
  if (!order) {
    throw new ApiErrors(404, "Order not found");
  }
  if (order.userId.toString() !== userId) {
    throw new ApiErrors(403, "You can only cancel your own orders");
  }
  if (order.status !== "pending") {
    throw new ApiErrors(400, "Only pending orders can be cancelled");
  }
  if (order.status === "cancelled") {
    throw new ApiErrors(400, "Order is already cancelled");
  }
  if (order.status === "confirmed") {
    throw new ApiErrors(400, "Confirmed orders cannot be cancelled");
  }
  order.status = "cancelled";
  await order.save();
  res
    .status(200)
    .json(new ApiResponse(200, order, "Order cancelled successfully"));
});

export {
  makeAnOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
};
