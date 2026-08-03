import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { WithChildren } from "@/types/common.types";

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({ children }: WithChildren) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
