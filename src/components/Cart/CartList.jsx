import CartItem from "./CartItem";

const CartList = ({ products, status }) => {
  const total = products.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  return (
    <div>
      {products.map((item, index) => (
        <CartItem data={item} key={index} status={status} />
      ))}
      <div>Всьго за замовлення: {total} грн.</div>
    </div>
  );
};
export default CartList;
