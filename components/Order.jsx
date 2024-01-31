"use client";

const Order = ({ item }) => {
  console.log(item);

  return (
    <>
      {item && (
        <div className="flex gap-5">
          <span>Розмір: {item.size}</span>
          <span>Кількість: {item.quantity}</span>
        </div>
      )}
    </>
  );
};

export default Order;
