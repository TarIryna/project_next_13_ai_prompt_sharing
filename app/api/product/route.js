import Product from "@models/product";
import { connectToDB } from "@utils/database";

import { getParams } from "@utils/getParams";

export const GET = async (request, { params }) => {
  let query = {};
  if (request.nextUrl) query = getParams(request.nextUrl.toString());
  try {
    await connectToDB();

    const products = await Product.find(query).limit(24);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  // console.log(params);
  const result = await request.json();
  try {
    await connectToDB();
    const product = await Product.find({
      category: result?.category,
      season: result?.season,
      view: result?.view,
    }).limit(36);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
