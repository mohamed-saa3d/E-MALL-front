import PublicLayout from "@/components/layouts/PublicLayout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
