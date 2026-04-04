"use client"

import Link from "next/link"
import { Shield, Award, Users, Clock, CheckCircle2, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { companyEstablishedDisplay, companyRegistrationDisplay } from "@/lib/site-seo"

/** Verifiable facts with internal sources (E-E-A-T / citation-ready). */
const verifiableFacts = [
  {
    fact: "SSM registration",
    detail: companyRegistrationDisplay,
    sourceHref: "/about",
    sourceLabel: "About (company vitals)",
  },
  {
    fact: "Established",
    detail: companyEstablishedDisplay,
    sourceHref: "/about",
    sourceLabel: "About",
  },
  {
    fact: "Headquarters",
    detail: "Malaysia",
    sourceHref: "/about",
    sourceLabel: "About",
  },
  {
    fact: "MSP support posture",
    detail:
      "24/7 monitoring and response are offered within defined managed service agreements (scope varies by SOW).",
    sourceHref: "/services",
    sourceLabel: "Services",
  },
] as const

const partnerAuthorizations = [
  "Authorized Extreme Networks Partner",
  "Authorized Aruba Partner",
  "Authorized Huawei Partner",
  "Authorized IBM Partner",
  "Authorized Xero Partner",
] as const

const advantages = [
  {
    icon: <Shield size={24} />,
    title: "Industry-Leading Partnerships",
    description:
      "Strategic authorized partnerships with leading technology manufacturers, combined with comprehensive product expertise across enterprise networking, surveillance, cloud platforms, and creative technology solutions.",
  },
  {
    icon: <Award size={24} />,
    title: "Proven Track Record",
    description: "Years of experience delivering successful IT solutions across various industries and project scales.",
  },
  {
    icon: <Users size={24} />,
    title: "Expert Team",
    description:
      "Skilled professionals with deep expertise in networking, infrastructure, software development, and consulting.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Comprehensive Solutions",
    description:
      "One-stop shop for all your IT needs - from hardware procurement to managed services and custom software.",
  },
  {
    icon: <Clock size={24} />,
    title: "Responsive Support",
    description: "24/7 support and rapid response times to keep your business running smoothly.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Cost-Effective Options",
    description:
      "Access to both new and refurbished equipment, flexible service packages, and transparent pricing.",
  },
]

const TrustSignals = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="section-title mb-2">What facts can you verify about us?</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mb-6">
            We publish machine-readable facts with internal citations instead of aggregate marketing statistics that
            are hard to audit.
          </p>
          <div className="overflow-x-auto rounded-lg border border-teal-400/20">
            <table className="w-full text-left text-sm text-gray-300 border-collapse">
              <caption className="sr-only">Verifiable company facts and sources</caption>
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/[0.08]">
                  <th scope="col" className="p-3 md:p-4 font-semibold text-gray-200">
                    Fact
                  </th>
                  <th scope="col" className="p-3 md:p-4 font-semibold text-gray-200">
                    Detail
                  </th>
                  <th scope="col" className="p-3 md:p-4 font-semibold text-gray-200">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {verifiableFacts.map((row) => (
                  <tr key={row.fact} className="border-b border-white/[0.06] last:border-0">
                    <th scope="row" className="p-3 md:p-4 align-top font-medium text-teal-400">
                      {row.fact}
                    </th>
                    <td className="p-3 md:p-4 align-top">{row.detail}</td>
                    <td className="p-3 md:p-4 align-top">
                      <Link
                        href={row.sourceHref}
                        className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
                      >
                        {row.sourceLabel}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="section-title mb-8">Authorized partner programs</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-2xl">
            OEM-aligned sourcing and warranties we disclose on the{" "}
            <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              Partners
            </Link>{" "}
            page.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerAuthorizations.map((cert) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glassmorphism p-3 md:p-4 rounded-lg border border-teal-400/30 flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-title mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism p-4 md:p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/40 transition-all"
              >
                <div className="text-teal-400 mb-4">{advantage.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-gray-300 text-xs md:text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSignals
