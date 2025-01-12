import { useProgressOrders } from "@/store/selectors/orders";
import { useUser } from "@/store/selectors";
import { changeOrderIsLoadingAction } from "@/store/actions/orders";
import { changeUserDeliveryDataAction } from "@/store/actions/user";
import { showToast } from "react-next-toast";
import { useFetchAllOrders } from "@/helpers/useFetchAllOrders";
import { useChangeOrderStatus } from "@/helpers/useChangeOrderStatus";

import CartList from "./CartList";
import CartShipping from "./CartShipping";
import CartClientInfo from "./CartClientInfo";
import { useState } from "react";

const CartInProcess = () => {
  const user = useUser()?.user?.user;
  const userId = user?.id;
  const products = useProgressOrders();

  const [needUpdate, setNeedUpdate] = useState(false);

  const handleOrder = (deliveryData) => {
    const orderId = generateId();
    const newStatus = "confirmed";
    changeOrderIsLoadingAction(true);
    products.map((item) =>
      useChangeOrderStatus({
        order: item,
        status: newStatus,
        orderId,
        delivery: deliveryData,
      })
    );
    changeOrderIsLoadingAction(false);
    useFetchAllOrders(userId);
  };

  const updateUser = async (orderData, id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(orderData),
      });

      if (response) {
        const data = await response?.json();
        changeUserDeliveryDataAction(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkInfo = (data) => {
    const result =
      data.name?.length > 0 &&
      data.surname?.length > 0 &&
      data.city?.length > 0 &&
      data.adress?.length > 0 &&
      data.phone?.length > 0
        ? true
        : false;
    return result;
  };

  const generateId = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const date = today.getDate().toString();
    const hours = today.getHours().toString();
    const minutes = today.getMinutes().toString();
    const seconds = today.getSeconds().toString();
    return year + month + date + hours + minutes + seconds;
  };

  const onSubmit = (e) => {
    setNeedUpdate(true);
    e.preventDefault();
    const name = e.target.elements.name.value;
    const surname = e.target.elements.surname.value;
    const phone = e.target.elements.phone.value;
    const isViber = e.target.elements.viber.checked;
    const city = e.target.elements.city.value;
    const adress = e.target.elements.adress.value;

    const orderData = {
      name,
      surname,
      phone,
      isViber,
      city,
      adress,
    };
    const isFullInfo = checkInfo(orderData);
    if (!isFullInfo) showToast.error("Не вся інформація заповнена");
    else {
      // const result = confirm("Зберегти реквізити доставки?");
      updateUser(orderData, userId);
      showToast.info("Очікуйте підтвердження замовлення!");
      handleOrder(orderData);
    }
    // else handleOrder("new");
    setNeedUpdate(false);
  };

  return (
    <div>
      <form className="cart_shipping__form" onSubmit={onSubmit}>
        <CartList status="progress" products={products} />
        <CartClientInfo needUpdate={needUpdate} />
        <CartShipping />
      </form>
    </div>
  );
};
export default CartInProcess;