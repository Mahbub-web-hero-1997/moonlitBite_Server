import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    details: { type: String, required: true },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates & manages createdAt and updatedAt
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
