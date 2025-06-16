import Cart from "../Models/cart.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get Cart by User ID
const getCartByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    throw new ApiErrors(404, "Cart not found");
  }

  res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiErrors(404, "Cart not found");
  }

  const existingItem = cart.items.find((item) =>
    item.productId.equals(productId)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiErrors(404, "Cart not found");
  }

  cart.items = cart.items.filter((item) => !item.productId.equals(productId));
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiErrors(404, "Cart not found");
  }

  cart.items = [];
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart, "Cart cleared successfully"));
});

// Export the function
export { getCartByUserId, addItemToCart, removeItemFromCart, clearCart };
