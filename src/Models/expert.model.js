import mongoose, { Schema } from "mongoose";
const expertSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Expert = mongoose.model("Expert", expertSchema);
export default Expert;
