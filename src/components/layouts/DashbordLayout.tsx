interface Props {
  children: React.ReactNode;
}
export default function DashbordLayout({ children }: Props) {
  return <div>{children}</div>;
}
