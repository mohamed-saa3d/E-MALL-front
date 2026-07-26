'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export function VerifyForm() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(60)
  useEffect(() => { if (seconds <= 0) return; const timer = window.setInterval(() => setSeconds(value => value - 1), 1000); return () => window.clearInterval(timer) }, [seconds])
  function verify() { if (code.length !== 6) return toast.error('Enter the six-digit code'); toast.success('Email verified'); router.push('/') }
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <section className="w-full max-w-lg rounded-3xl border bg-card p-7 text-center shadow-xl md:p-10">
        <Link href="/" className="font-bold text-primary">
          E-Mall
        </Link>
        <h1 className="mt-5 text-3xl font-bold">Verify your email</h1>
        <p className="mt-2 text-muted-foreground">
          We sent a six-digit code to your email address.
        </p>
        <div className="my-8 flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot index={index} key={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full" size="lg" onClick={verify}>
          Verify email
        </Button>
        <p className="mt-6 text-sm text-muted-foreground">
          {seconds > 0
            ? `Resend available in ${seconds}s`
            : "Didn't receive the code?"}
        </p>
        <Button
          variant="link"
          disabled={seconds > 0}
          onClick={() => {
            setSeconds(60);
            toast.success("A new code was sent");
          }}
        >
          Resend code
        </Button>
        <div>
          <Button
            nativeButton={false}
            render={<Link href="/login" />}
            variant="ghost"
          >
            Back to login
          </Button>
        </div>
      </section>
    </main>
  );
}
