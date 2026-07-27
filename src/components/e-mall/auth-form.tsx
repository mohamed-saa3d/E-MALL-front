'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type ComponentProps } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(8, 'Use at least 8 characters') })
const authSchema = loginSchema.extend({ name: z.string().optional(), phone: z.string().optional(), terms: z.boolean().optional() })
type Values = z.infer<typeof authSchema>
type CheckedValue = Parameters<NonNullable<ComponentProps<typeof Checkbox>['onCheckedChange']>>[0]

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [show, setShow] = useState(false)
  const schema = authSchema.superRefine((values, context) => {
    if (mode !== 'register') return
    if (!values.name || values.name.length < 2) context.addIssue({ code: 'custom', path: ['name'], message: 'Enter your name' })
    if (!values.terms) context.addIssue({ code: 'custom', path: ['terms'], message: 'You must accept the terms' })
  })
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', password: '', phone: '', terms: false } })
  const submit = form.handleSubmit(() => { toast.success(mode === 'login' ? 'Welcome back' : 'Account details accepted'); router.push(mode === 'login' ? '/' : '/verify-email') })
  return <div className="relative flex min-h-screen items-center justify-center px-4 py-10"><div className="fixed inset-0 bg-[url('/images/mall-interior.png')] bg-cover bg-center" /><div className="fixed inset-0 bg-foreground/25" /><section className="relative w-full max-w-xl rounded-[2rem] border bg-card/92 p-6 shadow-2xl backdrop-blur-xl md:p-10"><Button className="absolute right-5 top-5" variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{resolvedTheme === 'dark' ? <Sun /> : <Moon />}</Button><div className="mb-8 pr-12"><Link href="/" className="text-sm font-bold text-primary">E-Mall</Link><h1 className="mt-4 text-balance text-4xl font-bold">{mode === 'login' ? 'Welcome back!' : 'Welcome!'}</h1><p className="mt-2 text-muted-foreground">Please enter your details to {mode === 'login' ? 'sign in' : 'sign up'}.</p></div><form onSubmit={submit}><FieldGroup>{mode === 'register' && <Field data-invalid={!!form.formState.errors.name}><FieldLabel htmlFor="name">Name</FieldLabel><Input id="name" placeholder="Enter your name" aria-invalid={!!form.formState.errors.name} {...form.register('name')} /><FieldError>{form.formState.errors.name?.message}</FieldError></Field>}<Field data-invalid={!!form.formState.errors.email}><FieldLabel htmlFor="email">Email address</FieldLabel><Input id="email" type="email" placeholder="you@example.com" aria-invalid={!!form.formState.errors.email} {...form.register('email')} /><FieldError>{form.formState.errors.email?.message}</FieldError></Field><Field data-invalid={!!form.formState.errors.password}><FieldLabel htmlFor="password">Password</FieldLabel><div className="relative"><Input id="password" type={show ? 'text' : 'password'} placeholder="At least 8 characters" className="pr-12" aria-invalid={!!form.formState.errors.password} {...form.register('password')} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</Button></div><FieldError>{form.formState.errors.password?.message}</FieldError></Field>{mode === 'register' && <Field><FieldLabel htmlFor="phone">Phone number <span className="text-muted-foreground">(optional)</span></FieldLabel><Input id="phone" type="tel" placeholder="Enter your phone number" {...form.register('phone')} /></Field>}<Field data-invalid={!!form.formState.errors.terms}><label className="flex items-center gap-3 text-sm"><Checkbox checked={form.watch('terms')} onCheckedChange={(value: CheckedValue) => form.setValue('terms', value === true, { shouldValidate: true })} />{mode === 'login' ? 'Remember for 30 days' : 'I agree with the terms & policy'}</label><FieldError>{form.formState.errors.terms?.message}</FieldError></Field><Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>{mode === 'login' ? 'Log in' : 'Register'}</Button></FieldGroup></form><div className="my-6 flex items-center gap-4"><span className="h-px flex-1 bg-border" /><span className="text-xs font-semibold text-muted-foreground">OR</span><span className="h-px flex-1 bg-border" /></div><div className="grid gap-3 sm:grid-cols-2"><Button variant="outline" onClick={() => toast.info('Google sign-in is not connected')}>Continue with Google</Button><Button variant="outline" onClick={() => toast.info('Apple sign-in is not connected')}>Continue with Apple</Button></div><p className="mt-7 text-center text-sm text-muted-foreground">{mode === 'login' ? "Don’t have an account?" : 'Already have an account?'} <Link className="font-semibold text-primary hover:underline" href={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Sign up' : 'Sign in'}</Link></p></section></div>
}
