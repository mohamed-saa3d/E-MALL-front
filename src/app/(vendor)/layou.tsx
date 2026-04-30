import VendorLayout from "@/components/layouts/VendorLayout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <VendorLayout>{children}</VendorLayout>;
};

export default Layout;
