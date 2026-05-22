"use client";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { useVerifyEmail } from "@/modules/auth/hooks/useVerifyEmail";
import  { useEffect, useRef } from "react";

const VerifyEmailPage = () => {
  const emailVerifiedRef = useRef(false);
  const { mutate: logout } = useLogout({redirectToLogin:false});
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { mutate: verifyEmail} = useVerifyEmail({
    onVerified: () => {
      emailVerifiedRef.current = true;
       if (logoutTimerRef.current) {
    clearTimeout(logoutTimerRef.current);
  }

    },
  });

  

useEffect(() => {
  if (logoutTimerRef.current) {
    clearTimeout(logoutTimerRef.current);
  }

  return () => {
    logoutTimerRef.current = setTimeout(() => {
      if (!emailVerifiedRef.current) {
        logout();
      }
    }, 500);
  };
}, [logout]);

  return (
    <></>
  );
};

export default VerifyEmailPage;
