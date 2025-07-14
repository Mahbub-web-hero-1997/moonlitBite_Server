import stripe from "../Config/stripe.config.js";
import Payment from "../models/payment.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
// Create Stripe Payment Intent and Save Record
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = "usd", description } = req.body;
  const userId = req.user.id;

  if (!amount || amount <= 0) {
    throw new ApiErrors(400, "Amount must be greater than 0");
  }

  // Create payment intent on Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    description,
    metadata: { userId },
  });

  // Save initial payment intent info
  const payment = await Payment.create({
    userId,
    stripePaymentIntentId: paymentIntent.id,
    amount,
    currency,
    status: paymentIntent.status,
    description,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        clientSecret: paymentIntent.client_secret,
        payment,
      },
      "Payment intent created"
    )
  );
});

// Confirm and Update Payment Info
const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;

  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (!intent) {
    throw new ApiErrors(404, "Payment Intent not found");
  }

  const updatedPayment = await Payment.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntentId },
    {
      status: intent.status,
      paymentMethod: intent.payment_method_types?.[0],
      receiptUrl: intent.charges?.data?.[0]?.receipt_url || "",
    },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedPayment, "Payment confirmed"));
});

export { createPaymentIntent, confirmPayment };
