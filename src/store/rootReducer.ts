import {combineReducers } from "@reduxjs/toolkit"
import cartReducer from "@/modules/cart/store/cart.slice"

export const rootReducer = combineReducers({
  cart: cartReducer,
}) 