import { changeProductAction } from "@store/actions/product";
export const fetchProduct = async ({ id }) => {
  try {
    const response = await fetch(`/api/product/${id}`);

    if (response.ok) {
      const data = await response.json();
      if (data) changeProductAction(data);
    }
  } catch (error) {
    console.log(error);
  }
};
