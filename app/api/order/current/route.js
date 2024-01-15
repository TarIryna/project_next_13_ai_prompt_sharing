import Order from "@models/orders";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const currentOrder = await Order.find({
      creator: params?.userId,
      status: "new",
    });
    if (!currentOrder) return new Response("Order Not Found", { status: 404 });
    return new Response(JSON.stringify(currentOrder), { status: 200 });
  } catch (error) {
    return new Response("Failed to find current order", { status: 500 });
  }
};
