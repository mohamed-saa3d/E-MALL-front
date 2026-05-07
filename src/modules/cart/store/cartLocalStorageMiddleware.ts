import type { Middleware } from "@reduxjs/toolkit";
import { addItem, removeItem, updateQuantity, clearCart ,  setCart} from "./cart.slice";

export const cartLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      addItem.match(action) ||
      removeItem.match(action) ||
      updateQuantity.match(action) ||
      clearCart.match(action)||
        setCart.match(action)
    ) {
      const items = store.getState().cart.items;
      if (typeof window !== "undefined") {
  localStorage.setItem("guest_cart", JSON.stringify(items));
}

    }

    return result;
  };