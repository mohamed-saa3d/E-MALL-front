import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

export default function UserLayout({ children }: Props) {
  return <div>{children}</div>;
}
