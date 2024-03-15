import { useProgressOrders } from "@store/selectors/orders";
import CartList from "./CartList";
import CartShipping from "./CartShipping";

const CartInProcess = () => {
  const products = useProgressOrders();

  return (
    <div>
      <CartList status="progress" products={products} />
      <CartShipping />
    </div>
  );
};
export default CartInProcess;
