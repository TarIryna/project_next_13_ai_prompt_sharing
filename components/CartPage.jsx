const CartPage = ({ data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <div>Cart</div>
      <div>
        {data && data.map((item, index) => <div key={index}>{item.Code}</div>)}
      </div>
    </section>
  );
};
export default CartPage;
