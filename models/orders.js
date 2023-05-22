import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    ref: "Product",
    required: [true, "Product is required."],
  },
  quantity: {
    type: Number,
    required: [true],
    default: 1,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Prompt;
