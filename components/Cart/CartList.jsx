import CartItem from "./CartItem";
import { changeOrderIsLoadingAction } from "@store/actions/orders";

const CartList = ({ status, products }) => {
  const total = products.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const updateOrder = async (order, status) => {
    try {
      const response = await fetch("/api/order/new", {
        method: "PATCH",
        body: JSON.stringify({
          date: new Date(),
          status,
          id: order._id,
        }),
      });

      if (response.ok) {
        setProcess(true);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleOrder = (status) => {
    const newStatus = status === "new" ? "in progress" : "confirmed";
    changeOrderIsLoadingAction(true);
    products.map((item) => updateOrder(item, newStatus));
    changeOrderIsLoadingAction(false);
  };

  return (
    <div>
      {products.map((item, index) => (
        <CartItem data={item} key={index} />
      ))}
      <div>Всьго за замовлення: {total} грн.</div>
      {status === "new" && (
        <button onClick={handleOrder(status)}>Оформити замовлення</button>
      )}
    </div>
  );
};
export default CartList;
