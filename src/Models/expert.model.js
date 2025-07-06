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
    bio: {
      type: String,
      required: true,
    },
    socialLinks: {
      facebook: { type: String, default: "#" },
      twitter: { type: String, default: "#" },
      linkedin: { type: String, default: "#" },
      instagram: { type: String, default: "#" },
    },
  },
  {
    timestamps: true,
  }
);

const Expert = mongoose.model("Expert", expertSchema);
export default Expert;
