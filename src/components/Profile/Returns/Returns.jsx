import { useUser } from "@/store/selectors";
import { useEffect, useState } from "react";

const Returns = () => {
  const { user, isAuth } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = fetch(`/api/users/${user.id}/orders/all`);
      const data = await response.json();

      setOrders(data);
    };

    if (user.id) fetchOrders();
  }, [user.id]);

  const handleEdit = (post) => {
    push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredOrders = myOrders.filter((item) => item._id !== post._id);

        setOrders(filteredOrders);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <div>Returns</div>;
};

export default Returns;
