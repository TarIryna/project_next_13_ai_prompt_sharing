import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    ref: "Product",
    type: Schema.Types.ObjectId,
    required: [true, "Product is required!"],
  },
  size: {
    type: String,
    required: [true, "Size is required!"],
  },
  quantity: {
    type: Number,
    required: [true],
    default: 1,
  },
  status: {
    type: String,
    required: [true],
    default: "new",
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
