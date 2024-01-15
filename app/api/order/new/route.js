import Order from "@models/orders";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const {
    userId,
    productId,
    size,
    quantity = 1,
    status = "new",
  } = await request.json();
  console.log(status);

  try {
    await connectToDB();
    const newOrder = new Order({
      creator: userId,
      product: productId,
      size,
      quantity,
      status,
    });

    await newOrder.save();
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new order", { status: 500 });
  }
};
