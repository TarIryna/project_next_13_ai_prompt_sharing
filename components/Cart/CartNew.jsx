import CartList from "./CartList";
import { useNewOrders } from "@store/selectors/orders";
import { useChangeOrderStatus } from "@helpers/useChangeOrderStatus";

const CartNew = () => {
  const products = useNewOrders();

  const changeOrderStatus = () => {
    products.map((order) => {
      useChangeOrderStatus({
        order,
        status: "in progress",
        orderId: null,
        deliveryData: null,
      });
    });
  };

  return (
    <div>
      <CartList status="new" products={products} />
      <button onClick={changeOrderStatus}>
        Продавжити оформлення замовлення
      </button>
    </div>
  );
};
export default CartNew;
