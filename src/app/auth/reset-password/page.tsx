import type { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: {
    index: false,
    follow: false
  }
};

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ResetPasswordPage({
  searchParams
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const tokenHash = firstValue(params.token_hash)?.trim() ?? "";
  const type = firstValue(params.type)?.trim() ?? "";
  const completed = firstValue(params.completed) === "1";

  return (
    <ResetPasswordForm
      completed={completed}
      tokenHash={type === "recovery" ? tokenHash : ""}
    />
  );
}
