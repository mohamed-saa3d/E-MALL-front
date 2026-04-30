import UserLayout from "@/components/layouts/UserLayout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <UserLayout>{children}</UserLayout>;
};

export default Layout;
