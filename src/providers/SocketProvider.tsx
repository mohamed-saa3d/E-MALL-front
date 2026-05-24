"use client";

import { WithChildren } from "@/types/common.types";

const SocketProvider = ({ children }: WithChildren) => {
  // Later: initialize socket connection here
  return <>{children}</>;
};

export default SocketProvider;