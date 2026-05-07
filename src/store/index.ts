import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { cartLocalStorageMiddleware } from "@/modules/cart/store/cartLocalStorageMiddleware";

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartLocalStorageMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export default makeStore;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
