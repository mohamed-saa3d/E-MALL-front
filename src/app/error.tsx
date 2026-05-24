"use client";

import { useEffect } from "react";
import ErrorFallback from "@/components/common/ErrorFallback";
import { logger } from "@/services/logger/logger";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error("Route Error Boundary", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <ErrorFallback
      title="Page error"
      message="This page crashed. You can try again."
      reset={reset}
    />
  );
}
