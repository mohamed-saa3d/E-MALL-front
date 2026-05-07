"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import makeStore, { type AppStore } from "@/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;