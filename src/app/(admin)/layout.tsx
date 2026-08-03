import AdminLayout from "@/components/layouts/AdminLayout";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { WithChildren } from "@/types/common.types";

export const dynamic = 'force-dynamic';

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>{children}</AdminLayout>
    </RoleGuard>
  );
};

export default Layout;
