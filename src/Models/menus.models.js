import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    recipe: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
