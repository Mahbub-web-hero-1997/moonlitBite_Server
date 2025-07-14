// import mongoose, { Schema } from "mongoose";

// const paymentSchema = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     stripePaymentIntentId: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "usd",
//     },
//     status: {
//       type: String,
//       enum: ["succeeded", "processing", "failed"],
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//     },
//     receiptUrl: {
//       type: String,
//     },
//     description: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Payment = mongoose.model("Payment", paymentSchema);

// export default Payment;
