import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const query = searchParams.get("query").toString();
  const pageSize = searchParams.get("pagesize");
  const page = searchParams.get("page");
  try {
    await connectToDB();
    let result = {};
    if (page > 1) {
      const total = await Product.find({
        $or: [{ name: { $regex: query } }],
      }).count();
      const response = await Product.find({
        $or: [{ name: { $regex: query } }],
      })
        .limit(pageSize)
        .skip((page - 1) * pageSize);
      result = { total, products: response };
    } else {
      const total = await Product.find({
        $or: [{ name: { $regex: query } }],
      }).count();
      const response = await Product.find({
        $or: [{ name: { $regex: query } }],
      })
        .limit(pageSize)
        .skip((page - 1) * pageSize);

      result = { products: response, total };
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};
