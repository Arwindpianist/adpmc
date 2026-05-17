import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"
import { companyRegistrationDisplay, siteName } from "@/lib/site-seo"

const capabilityLinks = [
  { href: "/services", label: "Operational capabilities" },
  { href: "/msp", label: "MSP & procurement" },
  { href: "/platforms", label: "Platforms & software factory" },
  { href: "/networking", label: "Networking & field" },
  { href: "/security", label: "Security & surveillance" },
  { href: "/ai", label: "GenAI & MaaS" },
  { href: "/creative", label: "Creative and audio" },
] as const

const siteLinks = [
  { href: "/projects", label: "Case studies", ariaLabel: "Case Studies in Infrastructure" as const },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

const footerLinkClass =
  "text-[#c9b8e8]/90 transition hover:text-dracula-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dracula-purple/50 rounded-sm"

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="surface-card mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <section className="space-y-4">
          <p className="section-kicker">Operating posture</p>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-50">{siteName}</h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#c9b8e8]/90">
              Systems integrator and managed service provider (Petaling Jaya): architected MaaS and GenAI deployments,
              provisioned enterprise networking and surveillance integrations, hardened systems administration, and
              deployed platforms including AssetLink and TicketOS. Underwritten by deployment speed, system integrity,
              and scalable architecture.
            </p>
          </div>
          <p className="text-sm text-[#c9b8e8]/70">Registration: {companyRegistrationDisplay}</p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-dracula-purple/80">Explore</h3>
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Capabilities</p>
              <ul className="grid gap-0.5 text-sm leading-snug">
                {capabilityLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Site</p>
              <ul className="grid gap-0.5 text-sm leading-snug">
                {siteLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-label={"ariaLabel" in link ? link.ariaLabel : undefined}
                      title={"ariaLabel" in link ? link.ariaLabel : undefined}
                      className={footerLinkClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-dracula-purple/80">Connect</h3>
          <div className="space-y-1 text-sm">
            <a href="mailto:hello@arwindpianist.com" className={`block py-0.5 ${footerLinkClass}`}>
              hello@arwindpianist.com
            </a>
            <a href="tel:+601114815030" className={`block py-0.5 ${footerLinkClass}`}>
              +60 11-1481 5030
            </a>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/adpmnc/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(189,147,249,0.15)] text-dracula-purple transition hover:border-[rgba(189,147,249,0.4)]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/arwindpianist-multimedia-consulting/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(189,147,249,0.15)] text-dracula-purple transition hover:border-[rgba(189,147,249,0.4)]"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </section>

        <div className="col-span-full border-t border-[rgba(189,147,249,0.12)] pt-6 text-sm text-[#c9b8e8]/70">
          <p>&copy; {new Date().getFullYear()} {siteName}. Crafted for premium, fast, trusted web experiences.</p>
        </div>
      </div>
    </footer>
  )
}
