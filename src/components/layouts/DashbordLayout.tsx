import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

export default function DashbordLayout({ children }: Props) {
  return <div>{children}</div>;
}
