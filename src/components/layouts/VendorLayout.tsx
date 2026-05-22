import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

export default function VendorLayout({ children }: Props) {
  return <div>{children}</div>;
}
