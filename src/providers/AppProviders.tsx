import React from "react";
import StoreProvider from "./StoreProvider";
interface AppProvidersProps {
  children: React.ReactNode;
}
const AppProviders = ({children}:AppProvidersProps) => {
  return (
  <StoreProvider>{children}</StoreProvider>
  )
}

export default AppProviders