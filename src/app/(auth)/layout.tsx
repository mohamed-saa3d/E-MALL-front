import AuthLayout from "@/components/layouts/AuthLayout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
