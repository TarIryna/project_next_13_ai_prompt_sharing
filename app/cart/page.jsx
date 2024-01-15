"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProviderNext from "@components/Provider";
import CartPage from "@components/CartPage";

const MyCart = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCurrentOrder = async () => {
      const response = await fetch(
        `/api/order/current/?userId=${session?.user.id}`
      );
      const data = await response.json();

      setProducts(data);
    };

    if (session?.user.id) fetchCurrentOrder();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    //TODO
    // router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    //TODO
    // const hasConfirmed = confirm(
    //   "Are you sure you want to delete this prompt?"
    // );
    // if (hasConfirmed) {
    //   try {
    //     await fetch(`/api/prompt/${post._id.toString()}`, {
    //       method: "DELETE",
    //     });
    //     const filteredPosts = myPosts.filter((item) => item._id !== post._id);
    //     setMyPosts(filteredPosts);
    //   } catch (error) {
    //     // console.log(error);
    //   }
    // }
  };

  return (
    <ProviderNext>
      <CartPage
        data={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </ProviderNext>
  );
};

export default MyCart;
