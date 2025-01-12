"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFetchAllOrders } from "@/helpers/useFetchAllOrders";
import Loading from "@app/profile/loading";
import CartNew from "../components/Cart/CartNew";
import CartInProcess from "../components/Cart/CartInProcess";
import CartSuccess from "../components/Cart/CartSuccess";
import CartError from "../components/Cart/CartError";
import CartEmpty from "../components/Cart/CartEmpty";
import { fetchCartItemNotauth } from "@/helpers/useFetchProduct";

import {
  useOrderIsError,
  useOrderIsLoading,
  useNewOrders,
  useProgressOrders,
  useSuccessOrders,
} from "@/store/selectors/orders";
import { loginUserAction } from "@/store/actions/user";

const CartPage = ({ data, handleEdit }) => {
  const { data: session } = useSession();
  const getNewOrder = (data) => {
    const items = data?.split(";");
    const newOrder = [];
    if (!items) return;
    items?.map((item) => {
      const data = item.split(",");
      data?.map((item) => console.log(item));
    });
  };

  if (session) loginUserAction(session);
  else {
    const localStorageData = localStorage?.getItem("cart");
    if (localStorageData) getNewOrder(localStorageData);
  }

  // const newOrders = useNewOrders();
  const progressOrders = useProgressOrders();
  const successOrders = useSuccessOrders();
  const isLoading = useOrderIsLoading();
  const isError = useOrderIsError();

  useEffect(() => {
    if (session?.id) useFetchAllOrders(session?.id);
  }, [session?.id]);

  return (
    <section className="w-full">
      <div className="text-center">Кошик</div>
      {/* {isLoading ? (
        <Loading />
      ) : isError ? (
        <CartError />
      ) : newOrders?.length > 0 ? (
        <CartNew />
      ) : progressOrders?.length > 0 ? (
        <CartInProcess />
      ) : successOrders?.length > 0 ? (
        <CartSuccess />
      ) : (
        <CartEmpty />
      )} */}
    </section>
  );
};
export default CartPage;
