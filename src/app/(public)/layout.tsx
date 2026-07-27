import PublicLayout from "@/components/layouts/PublicLayout";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
