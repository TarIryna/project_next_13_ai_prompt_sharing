"use client";

import { useFetchAllOrders } from "@/helpers/useFetchAllOrders";
import { showToast } from "react-next-toast";
import { useUser } from "@/store/selectors";

const CartItem = ({ admin, data, status }) => {
  const userId = useUser()?.user?.id;
  const deleteOrder = async () => {
    try {
      const response = await fetch(`/api/order/new/${data._id.toString()}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showToast.success("Успішно видалено із кошика!");
        useFetchAllOrders(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data && (
        <div className="flex align-center">
          <img src={data.image} width="100" height="100" />
          <span className="mr-10">Розмір: {data.size}</span>
          <span className="mr-10">Кількість: {data.quantity}</span>
          <span className="mr-10">Ціна: {data.price} грн.</span>
          {(status === "new" || status === "in process") && (
            <img
              className="pointer"
              src="@/assets/icons/delete.svg"
              width="16"
              height="16"
              onClick={deleteOrder}
              alt="delete"
            />
          )}
        </div>
      )}
    </>
  );
};
export default CartItem;
