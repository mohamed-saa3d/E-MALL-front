import { WithChildren } from "@/types/common.types";

type Props = WithChildren;

export default function PublicLayout({ children }: Props) {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
