import VendorLayout from "@/components/layouts/VendorLayout";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return <VendorLayout>{children}</VendorLayout>;
};

export default Layout;
