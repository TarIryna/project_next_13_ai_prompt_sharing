import { useSuccessOrders } from "@store/selectors/orders";
import CartList from "./CartList";

const CartSuccess = () => {
  const products = useSuccessOrders();

  return (
    <div>
      <CartList status="success" products={products} />
    </div>
  );
};
export default CartSuccess;
