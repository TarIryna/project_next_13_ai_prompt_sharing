"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrdersList from "@components/OrdersList";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) router.push("/");

  const [myPosts, setMyPosts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      const responseOrders = await fetch(
        `/api/users/${session?.user.id}/orders`
      );
      const dataOrders = await responseOrders.json();

      setMyPosts(data);
      setMyOrders(dataOrders);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
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

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(myOrders);

  return (
    <>
      <OrdersList data={myOrders} />
    </>
  );
};

export default MyProfile;
