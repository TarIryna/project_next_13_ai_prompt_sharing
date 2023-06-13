import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../slice/products";

export const rootReducer = combineReducers({
  producst: productsSlice.reducer,
});
