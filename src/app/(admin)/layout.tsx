import AdminLayout from "@/components/layouts/AdminLayout";
import {WithChildren} from "@/types/common.types"

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
