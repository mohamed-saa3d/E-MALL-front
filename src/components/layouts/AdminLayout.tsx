import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

export default function AdminLayout({ children }: Props) {
  return <div>{children}</div>;
}
