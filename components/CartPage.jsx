"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Loading from "@app/profile/loading";

const CartPage = ({ data, handleEdit }) => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [submitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const fetchCurrentOrder = async () => {
      if (submitting) return;
      const response = await fetch(`/api/users/${session?.user.id}/orders/new`);
      const data = await response.json();

      setProducts(data);
    };

    if (session?.user.id) fetchCurrentOrder();
  }, [session?.user.id, submitting, needUpdate]);

  const updateOrder = async (order) => {
    try {
      const response = await fetch("/api/order/new", {
        method: "PATCH",
        body: JSON.stringify({
          date: new Date(),
          status: "confirmed",
          id: order._id,
        }),
      });

      if (response.ok) {
        //
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleOrder = () => {
    setIsSubmitting(true);
    products.map((item) => updateOrder(item));
    setIsSubmitting(false);
    setSuccess(true);
  };

  const total = products.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  return (
    <section className="w-full">
      <div className="text-center">Кошик</div>
      <div>
        {products?.length === 0 && !submitting && !success && (
          <div>Додайте товари у кошик</div>
        )}
        {success && <h2>Замовлення успішно прийнято</h2>}
        {submitting && <Loading />}
        {products.length > 0 && !submitting && !success && (
          <div>
            {products.map((item, index) => (
              <CartItem data={item} key={index} setNeedUpdate={setNeedUpdate} />
            ))}
            <div>Всьго за замовлення: {total} грн.</div>
            <button onClick={handleOrder}>Оформити замовлення</button>
          </div>
        )}
      </div>
    </section>
  );
};
export default CartPage;
