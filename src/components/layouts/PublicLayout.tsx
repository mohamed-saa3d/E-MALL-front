'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, CircleUserRound, Heart, Home, Menu, ShoppingCart, Store, Tag, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/e-mall/theme-toggle'
import { categories } from '@/components/e-mall/data'

function CategoryList() {
  return <nav aria-label="Product categories" className="flex flex-col gap-1">{categories.map(({ name, icon: Icon, children }) => <div key={name}><button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-accent"><Icon className="size-4" />{name}</button>{children && <div className="flex flex-col gap-1 pb-2 pl-10">{children.map(item => <a className="text-sm text-muted-foreground hover:text-primary" href="#popular" key={item}>{item}</a>)}</div>}</div>)}</nav>
}

function Header() {
  return <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur"><div className="flex h-16 items-center gap-3 px-4 lg:px-8"><Sheet><SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open categories"><Menu /></Button>} /><SheetContent side="left"><SheetHeader><SheetTitle>All Categories</SheetTitle></SheetHeader><div className="p-4"><CategoryList /></div></SheetContent></Sheet><Link href="/" className="mr-auto text-xl font-bold"><span className="text-primary">E</span>-Mall</Link><nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">{[['Home', Home], ['Stores', Store], ['Deals', Tag], ['New Arrivals', Zap]].map(([label, Icon]) => <a key={label as string} href="#" className="flex items-center gap-2 text-sm font-medium hover:text-primary"><Icon className="size-4" />{label as string}</a>)}</nav><div className="flex items-center gap-1"><ThemeToggle /><Button variant="ghost" size="icon" aria-label="Wishlist"><Heart /></Button><Button variant="ghost" size="icon" aria-label="Cart"><ShoppingCart /></Button><Button nativeButton={false} render={<Link href="/login" />} variant="ghost" size="icon" aria-label="Sign in"><CircleUserRound /></Button></div></div></header>
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)

  return <div className="min-h-screen bg-background"><Header /><div className="flex"><aside className={`hidden shrink-0 border-r bg-card transition-[width] duration-300 lg:block ${open ? 'w-64' : 'w-16'}`}><div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-3"><div className="mb-3 flex items-center justify-between"><span className={open ? 'font-semibold' : 'sr-only'}>All Categories</span><Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label={open ? 'Collapse categories' : 'Expand categories'}>{open ? <ChevronLeft /> : <ChevronRight />}</Button></div>{open ? <CategoryList /> : <div className="flex flex-col items-center gap-3">{categories.slice(0,8).map(({name,icon:Icon}) => <Button key={name} variant="ghost" size="icon" title={name}><Icon /></Button>)}</div>}</div></aside>{children}</div></div>
}
