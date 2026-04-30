import AdminLayout from "@/components/layouts/AdminLayout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
