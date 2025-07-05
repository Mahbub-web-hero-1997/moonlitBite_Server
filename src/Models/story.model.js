import { model, Schema } from "mongoose";

const storySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Story = new model("Story", storySchema);
export default Story;
