import React from "react";
import StoreProvider from "./StoreProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import AuthProvider from "./AuthProvider";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const AppProviders = ({ children }: Props) => {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </StoreProvider>
  );
};

export default AppProviders;
