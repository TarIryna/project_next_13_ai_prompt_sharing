import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../slice/products";
import { ordersSlice } from "@store/slice/orders";
import { userSlice } from "@store/slice/user";

export const rootReducer = combineReducers({
  products: productsSlice.reducer,
  orders: ordersSlice.reducer,
  user: userSlice.reducer,
});
