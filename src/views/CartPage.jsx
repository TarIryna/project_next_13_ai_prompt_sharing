"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFetchAllOrders } from "@/helpers/useFetchAllOrders";
import Loading from "@/app/profile/loading";
import CartNew from "@/components/Cart/CartNew";
import CartInProcess from "@/components/Cart/CartInProcess";
import CartSuccess from "@/components/Cart/CartSuccess";
import CartError from "@/components/Cart/CartError";
import CartEmpty from "@/components/Cart/CartEmpty";
import { fetchCartItemNotauth } from "@/helpers/useFetchProduct";
import { PageContainer } from "@/components";

import {
  useOrderIsError,
  useOrderIsLoading,
  useNewOrders,
  useProgressOrders,
  useSuccessOrders,
} from "@/store/selectors/orders";
import { loginUserAction } from "@/store/actions/user";
import { useUser } from "@/store/selectors";

const CartPage = ({ data, handleEdit }) => {
  const { isAuth, user } = useUser();
  const [localStorageData, setLocalStorageData] = useState([]);

  const newOrders = useNewOrders();
  const progressOrders = useProgressOrders();
  const successOrders = useSuccessOrders();
  const isLoading = useOrderIsLoading();
  const isError = useOrderIsError();

  const getNewOrder = (data) => {
    const items = !!progressOrders?.length ? [...progressOrders] : [];
    data.split(";").map((item) => {
      const obj = {};
      item.split(",").forEach((pair) => {
        const [key, value] = pair.split("=");
        obj[key] = value === "undefined" ? "" : value;
      });
      items.push(obj);
    });
    setLocalStorageData(items);
  };

  useEffect(() => {
    if (user?.id) useFetchAllOrders(user?.id);
  }, [user?.id]);

  useEffect(() => {
    const localStorageData =
      typeof window !== "undefined" && localStorage.getItem("cart");
    if (localStorageData) {
      getNewOrder(localStorageData);
    }
  }, [isAuth]);

  return (
    <PageContainer>
      <h2>Кошик</h2>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <CartError />
      ) : newOrders?.length > 0 ? (
        <CartNew />
      ) : progressOrders?.length > 0 ? (
        <CartInProcess orders={progressOrders} />
      ) : successOrders?.length > 0 ? (
        <CartSuccess />
      ) : !!localStorageData?.length ? (
        <CartInProcess orders={localStorageData} />
      ) : (
        <CartEmpty />
      )}
    </PageContainer>
  );
};
export default CartPage;
