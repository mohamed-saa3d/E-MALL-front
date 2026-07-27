import VendorLayout from "@/components/layouts/VendorLayout";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

const Layout = ({ children }: Props) => {
  return (
    <RoleGuard allowedRoles={["vendor"]}>
      <VendorLayout>{children}</VendorLayout>
    </RoleGuard>
  );
};

export default Layout;
