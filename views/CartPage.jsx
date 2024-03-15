"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@app/profile/loading";
import CartNew from "../components/Cart/CartNew";
import CartInProcess from "../components/Cart/CartInProcess";
import CartSuccess from "../components/Cart/CartSuccess";
import CartError from "../components/Cart/CartError";
import CartEmpty from "../components/Cart/CartEmpty";
import {
  changeOrderAllOrdersAction,
  changeOrderIsLoadingAction,
  changeOrderisErrorAction,
  changeOrdersUserAction,
} from "@store/actions/orders";
import {
  useAllOrders,
  useOrderIsError,
  useOrderIsLoading,
  useNewOrders,
  useProgressOrders,
  useSuccessOrders,
} from "@store/selectors/orders";
import { loginUserAction } from "@store/actions/user";

const CartPage = ({ data, handleEdit }) => {
  const { data: session } = useSession();
  if (session) loginUserAction(session);

  const newOrders = useNewOrders();
  const progressOrders = useProgressOrders();
  const successOrders = useSuccessOrders();
  const isLoading = useOrderIsLoading();
  const isError = useOrderIsError();

  useEffect(() => {
    const fetchAllOrders = async () => {
      changeOrderIsLoadingAction(true);

      const response = await fetch(`/api/users/${session?.user.id}/orders/all`);
      const data = await response.json();

      if (data) {
        const newOrder = data.filter((item) => item.status === "new");
        const progress = data.filter((item) => item.status === "in progress");
        const success = data.filter((item) => item.status === "confirmed");
        const error = data.filter((item) => item.status === "error");
        changeOrderAllOrdersAction({ new: newOrder, progress, success, error });
      }
      changeOrderIsLoadingAction(false);
    };

    if (session?.user.id) fetchAllOrders();
  }, [session?.user.id]);

  return (
    <section className="w-full">
      <div className="text-center">Кошик</div>
      {isLoading ? (
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
      )}
    </section>
  );
};
export default CartPage;
