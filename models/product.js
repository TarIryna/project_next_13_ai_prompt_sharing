import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    view: {
      type: String,
    },
    season: {
      type: String,
      required: [true, "season is required"],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    price2: {
      type: Number,
    },
    sizes: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
