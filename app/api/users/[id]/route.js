import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
  const { name, surname, phone, isViber, city, adress } = await request.json();

  try {
    await connectToDB();
    // Find the existing product by ID
    const existingUser = await User.findById(params.id);
    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    // Update user with new data
    existingUser.name = name;
    existingUser.surname = surname;
    existingUser.phone = phone;
    existingUser.isViber = isViber;
    existingUser.city = city;
    existingUser.adress = adress;

    await existingUser.save();

    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response("Error Updating User", { status: 500 });
  }
};
