"use client";

import {
  changeOrderIsLoadingAction,
  changeOrderAllOrdersAction,
} from "@store/actions/orders";
import { useUser } from "@store/selectors";

const CartItem = ({ data }) => {
  const userId = useUser()?.user.user.id;

  const fetchAllOrders = async () => {
    changeOrderIsLoadingAction(true);
    const response = await fetch(`/api/users/${userId}/orders/all`);
    const data = await response.json();

    if (data) {
      const newOrder = data.filter((item) => item.status === "new");
      const progress = data.filter((item) => item.status === "in progress");
      const success = data.filter((item) => item.status === "confirmed");
      const error = data.filter((item) => item.status === "error");
      changeOrderAllOrdersAction({ new: newOrder, progress, success, error });
    }
    changeOrderIsLoadingAction(false);
  };

  const deleteOrder = async () => {
    try {
      const response = await fetch(`/api/order/new/${data._id.toString()}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAllOrders();
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
          <img
            className="pointer"
            src="/assets/icons/delete.svg"
            width="16"
            height="16"
            onClick={deleteOrder}
          />
        </div>
      )}
    </>
  );
};
export default CartItem;
