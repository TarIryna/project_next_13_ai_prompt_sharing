import CartList from "./CartList";
import { useNewOrders } from "@store/selectors/orders";

const CartNew = () => {
  const products = useNewOrders();

  return (
    <div>
      <CartList status="new" products={products} />
    </div>
  );
};
export default CartNew;
