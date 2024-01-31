import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  console.log(params);
  const result = await request.json();
  console.log("result", result);
  try {
    await connectToDB();
    const product = await Product.find({
      category: params?.category,
    }).limit(36);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  // console.log(params);
  // const result = await request.json();
  // console.log("result", result);
  try {
    await connectToDB();
    const product = await Product.find({
      category: params?.category,
    }).limit(36);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
