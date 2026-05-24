import React from "react";
import StoreProvider from "./StoreProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import AuthProvider from "./AuthProvider";
import { WithChildren } from "@/types/common.types";
import SocketProvider from "./SocketProvider";


const AppProviders = ({ children }: WithChildren) => {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <SocketProvider>{children}</SocketProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </StoreProvider>
  );
};

export default AppProviders;
