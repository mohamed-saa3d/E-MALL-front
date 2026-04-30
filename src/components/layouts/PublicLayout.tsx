interface Props {
  children: React.ReactNode;
}
export default function PublicLayout({ children }: Props) {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
