import {combineReducers } from "@reduxjs/toolkit"
import cartReducer from "@/modules/cart/store/cart.slice"
import  authReducer  from '@/modules/auth/store/auth.slice';
export const rootReducer = combineReducers({
  cart: cartReducer,
  auth:authReducer
}) 