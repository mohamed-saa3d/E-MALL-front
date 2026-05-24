import ResetPasswordForm from "./ResetPasswordForm";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { token } = await params;
  return (
    <>
      <ResetPasswordForm token={token} />
    </>
  );
}
