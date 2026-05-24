"use client";

import { useEffect } from "react";
import { logger } from "@/services/logger/logger";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logger.error("Global App Error", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-bold text-red-700">Critical app error</h1>

          <p className="max-w-md text-sm text-gray-600">
            The application crashed unexpectedly.
          </p>

          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
