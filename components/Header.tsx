"use client"

import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, Sparkles } from "lucide-react"

import logo from "../public/logo.svg"
import MagneticButton from "@/components/MagneticButton"
import TransitionLink from "@/components/TransitionLink"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const capabilityNavItems = [
  { href: "/msp", label: "MSP & procurement" },
  { href: "/platforms", label: "Platforms & software factory" },
  { href: "/networking", label: "Networking & field" },
  { href: "/security", label: "Security & surveillance" },
  { href: "/ai", label: "GenAI & MaaS" },
  { href: "/creative", label: "Creative and audio" },
] as const

const exploreHubItems = [
  { href: "/services", label: "Operational capabilities hub" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
] as const

const directNavItems = [
  { href: "/projects", label: "Case studies", ariaLabel: "Case Studies in Infrastructure" as const },
  { href: "/contact", label: "Contact" },
] as const

const navLinkClass =
  "gpu-layer inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm text-[#c9b8e8]/90 transition-colors hover:text-dracula-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dracula-purple/50"

const mobileNavItems = [...capabilityNavItems, ...exploreHubItems, ...directNavItems] as const

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="liquid-layer gpu-layer mx-auto flex w-full max-w-7xl items-center justify-between rounded-[2rem] border border-[rgba(189,147,249,0.15)] bg-[#0a0a0a]/90 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.55),0_0_80px_-20px_rgba(189,147,249,0.12)] backdrop-blur-xl transition-[border-color] duration-150 hover:border-[rgba(189,147,249,0.35)] sm:px-5">
        <TransitionLink
          href="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Arwindpianist home"
        >
          <Image src={logo} alt="" width={32} height={32} priority className="h-8 w-8 shrink-0" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-[-0.02em] text-zinc-50">
              Arwindpianist Multimedia & Consulting
            </p>
            <p className="text-xs text-zinc-400/60">SI &amp; MSP · MaaS · Hardened infrastructure</p>
          </div>
        </TransitionLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
                <Sparkles className="h-4 w-4 text-dracula-purple" />
                Explore
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[min(28rem,calc(100vh-6rem))] w-72">
                <DropdownMenuLabel>Dedicated capability pages</DropdownMenuLabel>
                {capabilityNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <TransitionLink href={item.href} className="w-full">
                      {item.label}
                    </TransitionLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Site hub</DropdownMenuLabel>
                {exploreHubItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <TransitionLink href={item.href} className="w-full">
                      {item.label}
                    </TransitionLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <TransitionLink href="/contact" className="w-full text-white">
                    Request a custom build
                  </TransitionLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {directNavItems.map((item) => (
            <MagneticButton key={item.href} intensity={8}>
              <TransitionLink
                href={item.href}
                aria-label={"ariaLabel" in item ? item.ariaLabel : undefined}
                title={"ariaLabel" in item ? item.ariaLabel : undefined}
                className={cn(navLinkClass, pathname === item.href && "bg-dracula-purple/12 text-zinc-50")}
              >
                {item.label}
              </TransitionLink>
            </MagneticButton>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="secondary" size="sm">
            <TransitionLink href="/projects" title="Case Studies in Infrastructure" aria-label="Case Studies in Infrastructure">
              Case studies
            </TransitionLink>
          </Button>
          <MagneticButton>
            <Button asChild size="sm">
              <TransitionLink href="/contact">
                Request mobilization
                <ArrowUpRight className="h-4 w-4" />
              </TransitionLink>
            </Button>
          </MagneticButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(24rem,calc(100vw-2rem))]">
            <SheetHeader>
              <SheetTitle>Navigate the site</SheetTitle>
              <SheetDescription>
                Dedicated capability pages, the operational hub, partners, case studies, and contact.
              </SheetDescription>
            </SheetHeader>
            <nav className="theme-scrollbar grid max-h-[65vh] gap-2 overflow-y-auto pt-4 pr-1" aria-label="Mobile primary">
              {mobileNavItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-label={"ariaLabel" in item ? item.ariaLabel : undefined}
                    title={"ariaLabel" in item ? item.ariaLabel : undefined}
                    className={cn(
                      "surface-card rounded-[1.5rem] px-4 py-3.5 text-base font-medium text-zinc-200 transition hover:text-white",
                      pathname === item.href && "border-[rgba(189,147,249,0.35)] bg-dracula-purple/10 text-zinc-50"
                    )}
                  >
                    {item.label}
                  </TransitionLink>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <SheetClose asChild>
                <MagneticButton className="w-full">
                  <Button asChild className="w-full justify-between">
                    <TransitionLink href="/contact">
                      Request mobilization
                      <ArrowUpRight className="h-4 w-4" />
                    </TransitionLink>
                  </Button>
                </MagneticButton>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
