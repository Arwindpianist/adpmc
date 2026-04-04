"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Building2, Wrench, FolderKanban, Info, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import SVGIMG from "../public/logo.svg"
import { Drawer } from "vaul"

const navLinkClass =
  "relative whitespace-nowrap rounded-md px-1.5 py-2 hover:text-teal-400 transition-colors duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, sectionId: string) => {
    e.preventDefault()
    if (pathname === "/") {
      if (sectionId === "") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      window.location.href = `/#${sectionId}`
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="glassmorphism fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-white/10">
      <div className="container mx-auto max-w-[100vw] px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center gap-2 sm:gap-4 min-h-[56px] sm:min-h-[64px]">
        <Link
          href="/"
          onClick={(e) => scrollToSection(e, "")}
          className="shrink-0 flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          aria-label="Arwindpianist home"
        >
          <Image src={SVGIMG} alt="" width={40} height={40} className="h-9 w-9 sm:h-10 sm:w-10" />
        </Link>

        {/* Desktop / large tablet: full nav only when there is room (xl+) */}
        <nav
          className="hidden xl:flex items-center justify-end flex-1 min-w-0 gap-1 2xl:gap-2 mr-2 2xl:mr-4"
          aria-label="Primary"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/services" className={`${navLinkClass} text-sm 2xl:text-base`}>
              Services
              <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>
          <motion.a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, "testimonials")}
            className={`${navLinkClass} text-sm 2xl:text-base`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Testimonials
            <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </motion.a>
          <motion.a
            href="#pricing"
            onClick={(e) => scrollToSection(e, "pricing")}
            className={`${navLinkClass} text-sm 2xl:text-base`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Pricing
            <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/partners" className={`${navLinkClass} text-sm 2xl:text-base`}>
              Partners
              <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/projects" className={`${navLinkClass} text-sm 2xl:text-base`}>
              Projects
              <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/about" className={`${navLinkClass} text-sm 2xl:text-base`}>
              About
              <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/contact" className={`${navLinkClass} text-sm 2xl:text-base`}>
              Contact
              <span className="absolute bottom-0.5 left-1.5 right-1.5 h-0.5 scale-x-0 bg-teal-400 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <motion.button
            type="button"
            className="hidden xl:inline-flex btn-primary text-sm px-4 2xl:px-6 py-2 whitespace-nowrap"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => scrollToSection(e, "pricing")}
          >
            Get Started
          </motion.button>

          <Drawer.Root direction="bottom" open={isMenuOpen} onOpenChange={setIsMenuOpen} shouldScaleBackground={false}>
            <Drawer.Trigger asChild>
              <motion.button
                type="button"
                className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-100 hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </motion.button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]" />
              <Drawer.Content
                className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[min(92dvh,880px)] flex-col rounded-t-2xl border border-white/10 border-b-0 bg-slate-950/95 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl outline-none"
                style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
              >
                <div className="flex flex-col items-center pt-3 pb-2 flex-shrink-0">
                  <div className="h-1.5 w-14 rounded-full bg-white/25" aria-hidden />
                  <Drawer.Title className="sr-only">Main navigation</Drawer.Title>
                  <Drawer.Description className="sr-only">Links to pages on this site</Drawer.Description>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-2 pb-6 min-h-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500 px-3 mb-3">Pages</p>
                  <nav className="flex flex-col gap-1.5" aria-label="Mobile primary">
                    <Drawer.Close asChild>
                      <Link
                        href="/services"
                        className="flex items-center gap-4 min-h-[52px] px-4 rounded-xl text-base font-medium text-gray-100 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-teal-400/20 active:bg-white/[0.1] transition-colors"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400 shrink-0">
                          <Wrench size={20} strokeWidth={2} />
                        </span>
                        <span>Services</span>
                      </Link>
                    </Drawer.Close>

                    <Drawer.Close asChild>
                      <Link
                        href="/partners"
                        className="flex items-center gap-4 min-h-[52px] px-4 rounded-xl text-base font-medium text-gray-100 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-teal-400/20 active:bg-white/[0.1] transition-colors"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400 shrink-0">
                          <Building2 size={20} strokeWidth={2} />
                        </span>
                        <span>Partners</span>
                      </Link>
                    </Drawer.Close>

                    <Drawer.Close asChild>
                      <Link
                        href="/projects"
                        className="flex items-center gap-4 min-h-[52px] px-4 rounded-xl text-base font-medium text-gray-100 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-teal-400/20 active:bg-white/[0.1] transition-colors"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400 shrink-0">
                          <FolderKanban size={20} strokeWidth={2} />
                        </span>
                        <span>Projects</span>
                      </Link>
                    </Drawer.Close>

                    <Drawer.Close asChild>
                      <Link
                        href="/about"
                        className="flex items-center gap-4 min-h-[52px] px-4 rounded-xl text-base font-medium text-gray-100 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-teal-400/20 active:bg-white/[0.1] transition-colors"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400 shrink-0">
                          <Info size={20} strokeWidth={2} />
                        </span>
                        <span>About</span>
                      </Link>
                    </Drawer.Close>

                    <Drawer.Close asChild>
                      <Link
                        href="/contact"
                        className="flex items-center gap-4 min-h-[52px] px-4 rounded-xl text-base font-medium text-gray-100 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-teal-400/20 active:bg-white/[0.1] transition-colors"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400 shrink-0">
                          <Mail size={20} strokeWidth={2} />
                        </span>
                        <span>Contact</span>
                      </Link>
                    </Drawer.Close>
                  </nav>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  )
}

export default Header
