"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import makeStore, { type AppStore } from "@/store";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;


const StoreProvider = ({ children }: Props) => {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;