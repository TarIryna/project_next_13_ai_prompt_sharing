import Order from "@models/orders";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const {
    userId,
    productId,
    size,
    quantity = 1,
    status = "new",
    image,
    price,
  } = await request.json();

  try {
    await connectToDB();
    const newOrder = new Order({
      creator: userId,
      product: productId,
      size,
      quantity,
      status,
      image,
      price,
    });

    await newOrder.save();
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new order", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { date, status, id } = await request.json();
  const orderId = Math.random();

  try {
    await connectToDB();

    // Find the existing product by ID
    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return new Response("Order not found", { status: 404 });
    }

    // Update the product with new data
    existingOrder.date = date;
    existingOrder.status = status;
    existingOrder.orderId = orderId;

    await existingOrder.save();

    return new Response("Successfully updated the order", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Order", { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  // console.log(params);
  try {
    await connectToDB();

    const orders = await Order.find({
      creator: params.id,
      status: "new",
    }).populate("creator");

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
