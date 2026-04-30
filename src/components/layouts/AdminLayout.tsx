interface Props {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: Props) {
  return <div>{children}</div>;
}
