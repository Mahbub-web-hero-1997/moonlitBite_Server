import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  details: { type: String, required: true },  
  reviewer: { type: String, required: true },
  createdAt: { type: Date, required: true},
  updatedAt: { type: Date, required: true }
},
{ timestamps: true,});

const Review=mongoose.model("Review", reviewSchema)

export default Review;