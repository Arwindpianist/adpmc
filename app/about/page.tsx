import Link from "next/link"
import AboutClient from "./AboutClient"
import {
  businessActivitySummary,
  businessForm,
  businessStatus,
  companyEstablishedDisplay,
  companyRegistrationDisplay,
  legalName,
} from "@/lib/site-seo"

export default function AboutPage() {
  return (
    <AboutClient>
      <div className="text-center mb-12">
        <h1 id="about-page-heading" className="text-2xl md:text-5xl font-bold mb-4">
          About Us
        </h1>
        <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
          {legalName} — your trusted partner for AI-native IT solutions in Malaysia.
        </p>
        <p className="text-sm md:text-lg text-gray-400 max-w-4xl mx-auto mt-5 leading-relaxed">
          Established in {companyEstablishedDisplay}, Arwindpianist Multimedia & Consulting is a Malaysia-based systems
          integrator and managed service provider led by Founder &amp; CEO Arwin Kumar—delivering AI-enabled software, IT
          infrastructure, networking, and multimedia solutions for growing teams and enterprises.
        </p>
      </div>

      <section
        className="glassmorphism p-8 rounded-lg mb-16"
        aria-labelledby="company-vitals-heading"
      >
        <h2 id="company-vitals-heading" className="text-2xl md:text-3xl font-bold mb-6">
          What are the company registration and leadership details?
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Founder &amp; CEO</dt>
            <dd className="text-gray-300">Arwin Kumar</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Established</dt>
            <dd className="text-gray-300">{companyEstablishedDisplay}</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Registration</dt>
            <dd className="text-gray-300">{companyRegistrationDisplay}</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Headquarters</dt>
            <dd className="text-gray-300">Malaysia</dd>
          </div>
        </dl>
      </section>

      <section
        className="glassmorphism p-8 rounded-lg mb-16"
        aria-labelledby="company-profile-heading"
      >
        <h2 id="company-profile-heading" className="text-2xl md:text-3xl font-bold mb-6">
          Company profile
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Legal entity</dt>
            <dd className="text-gray-300">{legalName}</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Business form</dt>
            <dd className="text-gray-300">{businessForm}</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Business model</dt>
            <dd className="text-gray-300">Managed Service Provider (MSP) and systems integrator</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Status</dt>
            <dd className="text-gray-300">{businessStatus}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-teal-400 font-semibold mb-1">Registered activities</dt>
            <dd className="text-gray-300">{businessActivitySummary}</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Partnership model</dt>
            <dd className="text-gray-300">
              Authorized partner ecosystem across networking, cloud, and surveillance technologies. See our{" "}
              <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
                partners page
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Flagship platform</dt>
            <dd className="text-gray-300">TicketOS (proprietary in-house SaaS)</dd>
          </div>
          <div>
            <dt className="text-teal-400 font-semibold mb-1">Proprietary platform</dt>
            <dd className="text-gray-300">MyceliumLink (proprietary in-house software platform)</dd>
          </div>
        </dl>
      </section>
    </AboutClient>
  )
}
