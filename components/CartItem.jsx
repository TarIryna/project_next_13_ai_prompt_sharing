"use client";
import { useEffect, useState } from "react";

const CartItem = ({ data, setNeedUpdate }) => {
  const [deleted, setDeleted] = useState(false);
  const deleteOrder = async () => {
    try {
      const response = await fetch(`/api/order/new/${data._id.toString()}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNeedUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data && !deleted && (
        <div className="flex align-center">
          <img src={data.image} width="100" height="100" />
          <span className="mr-10">Розмір: {data.size}</span>
          <span className="mr-10">Кількість: {data.quantity}</span>
          <span className="mr-10">Ціна: {data.price} грн.</span>
          <img
            class="pointer"
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
