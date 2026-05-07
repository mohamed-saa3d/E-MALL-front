import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

export const selectCartItemByProductId = createSelector(
  [
    selectCartItems,
    (_state: RootState, productId: string) => productId,
  ],
  (items, productId) =>
    items.find((item) => item.productId === productId)
);