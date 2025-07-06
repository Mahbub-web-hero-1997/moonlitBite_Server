import mongoose, { Schema } from "mongoose";
const partySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);
const Party = mongoose.model("Party", partySchema);
export default Party;
