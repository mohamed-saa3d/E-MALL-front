import AuthLayout from "@/components/layouts/AuthLayout";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
