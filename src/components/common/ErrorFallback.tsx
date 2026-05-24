"use client";

type ErrorFallbackProps = {
  title?: string;
  message?: string;
  reset?: () => void;
};

export default function ErrorFallback({
  title = "Something went wrong",
  message = "Please try again later.",
  reset,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-xl font-semibold text-red-700">{title}</h2>

      <p className="max-w-md text-sm text-red-600">{message}</p>

      {reset && (
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}