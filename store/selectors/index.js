import { useSelector } from "react-redux";

export const useUser = () => useSelector((state) => state.user);

export const useCommon = () => useSelector((state) => state.common);

export const useOrders = () => useSelector((state) => state.orders);


