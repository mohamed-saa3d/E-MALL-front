import UserLayout from "@/components/layouts/UserLayout";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return <UserLayout>{children}</UserLayout>;
};

export default Layout;
