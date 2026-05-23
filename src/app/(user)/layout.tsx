import UserLayout from "@/components/layouts/UserLayout";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return <RoleGuard allowedRoles={["user"]} >
  <UserLayout>{children}</UserLayout>
  </RoleGuard>
};

export default Layout;
