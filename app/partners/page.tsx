"use client"

import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Award, Cloud, Music2, Network, Cctv, ArrowLeft, Building2, Users } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
)

// Import the same data from Partnerships component
const authorizedPartners = [
  {
    name: "Extreme Networks",
    description: "Enterprise networking and wireless solutions",
    category: "authorized" as const,
    url: "https://www.extremenetworks.com",
  },
  {
    name: "Aruba",
    description: "Network infrastructure and wireless technology",
    category: "authorized" as const,
    url: "https://www.arubanetworks.com",
  },
  {
    name: "Huawei",
    description: "Enterprise networking and telecommunications",
    category: "authorized" as const,
    url: "https://www.huawei.com",
  },
  {
    name: "IBM",
    description: "Enterprise software and infrastructure solutions",
    category: "authorized" as const,
    url: "https://www.ibm.com",
  },
  {
    name: "Xero",
    description: "Cloud accounting and business management",
    category: "authorized" as const,
    url: "https://www.xero.com",
  },
  {
    name: "Zoho",
    description: "Business software suite and cloud applications",
    category: "authorized" as const,
    url: "https://www.zoho.com",
  },
  {
    name: "Vercel",
    description: "Frontend deployment and web infrastructure platform",
    category: "authorized" as const,
    url: "https://vercel.com",
  },
  {
    name: "Supabase",
    description: "Backend-as-a-Service and open-source database platform",
    category: "authorized" as const,
    url: "https://supabase.com",
  },
  {
    name: "Myceliumlink",
    description: "Decentralized data layer and blockchain-secured data infrastructure",
    category: "authorized" as const,
    url: "https://myceliumlink.com",
  },
]

const networkingProducts = [
  {
    name: "Cisco",
    description: "Enterprise switching, routing, and wireless",
    category: "networking" as const,
    url: "https://www.cisco.com",
  },
  {
    name: "Juniper Networks",
    description: "High-performance networking infrastructure and routing",
    category: "networking" as const,
    url: "https://www.juniper.net",
  },
  {
    name: "MikroTik",
    description: "RouterOS and networking hardware – Routers, switches, and wireless systems",
    category: "networking" as const,
    url: "https://mikrotik.com",
  },
  {
    name: "Ubiquiti UniFi",
    description: "Centralized network management and Wi-Fi",
    category: "networking" as const,
    url: "https://www.ui.com",
  },
  {
    name: "TP-Link Omada",
    description: "Business networking – Switches, routers, and access points",
    category: "networking" as const,
    url: "https://www.tp-link.com/us/business-networking/omada-sdn/",
  },
  {
    name: "Ruckus Networks",
    description: "Enterprise wireless and network infrastructure",
    category: "networking" as const,
    url: "https://www.commscope.com/ruckus/",
  },
  {
    name: "Netgear Business",
    description: "Business networking – Switches, routers, and storage solutions",
    category: "networking" as const,
    url: "https://www.netgear.com/business/",
  },
  {
    name: "HPE Networking",
    description: "Enterprise network switches and wireless solutions",
    category: "networking" as const,
    url: "https://www.hpe.com/us/en/networking.html",
  },
  {
    name: "D-Link Business",
    description: "Business network infrastructure – Switches, routers, and security appliances",
    category: "networking" as const,
    url: "https://www.dlink.com/en/business",
  },
]

const cctvProducts = [
  {
    name: "Hikvision",
    description: "IP cameras, NVRs, DVRs, and video surveillance systems",
    category: "cctv" as const,
    url: "https://www.hikvision.com",
  },
  {
    name: "Dahua",
    description: "Video surveillance – IP cameras, recorders, and security systems",
    category: "cctv" as const,
    url: "https://www.dahuasecurity.com",
  },
  {
    name: "Uniview",
    description: "IP surveillance cameras and network video solutions",
    category: "cctv" as const,
    url: "https://www.uniview.com",
  },
  {
    name: "Axis Communications",
    description: "Network cameras and video surveillance solutions",
    category: "cctv" as const,
    url: "https://www.axis.com",
  },
  {
    name: "Hanwha Vision",
    description: "Wisenet IP cameras and video management systems",
    category: "cctv" as const,
    url: "https://www.hanwhavision.com",
  },
  {
    name: "TP-Link VIGI",
    description: "Business IP surveillance cameras and NVR systems",
    category: "cctv" as const,
    url: "https://www.tp-link.com/us/business-networking/vigi/",
  },
  {
    name: "HiLook",
    description: "IP cameras and video surveillance solutions",
    category: "cctv" as const,
    url: "https://www.hikvision.com/en/products/ip-products/hilook/",
  },
  {
    name: "Ezviz",
    description: "Commercial IP cameras and video surveillance systems",
    category: "cctv" as const,
    url: "https://www.ezviz.com",
  },
]

const mspPlatforms = [
  {
    name: "Microsoft",
    description: "Microsoft 365, Azure – Cloud infrastructure, identity, and automation",
    category: "msp" as const,
    url: "https://www.microsoft.com",
  },
  {
    name: "Google Workspace",
    description: "Collaboration, productivity, and cloud services",
    category: "msp" as const,
    url: "https://workspace.google.com",
  },
  {
    name: "Amazon Web Services",
    description: "AWS – Cloud computing and infrastructure services",
    category: "msp" as const,
    url: "https://aws.amazon.com",
  },
  {
    name: "Cloudflare",
    description: "CDN, security, and performance optimization",
    category: "msp" as const,
    url: "https://www.cloudflare.com",
  },
  {
    name: "Fortinet",
    description: "Network security and firewall solutions",
    category: "msp" as const,
    url: "https://www.fortinet.com",
  },
  {
    name: "Sophos",
    description: "Cybersecurity solutions and endpoint protection",
    category: "msp" as const,
    url: "https://www.sophos.com",
  },
  {
    name: "Veeam",
    description: "Backup, disaster recovery, and business continuity",
    category: "msp" as const,
    url: "https://www.veeam.com",
  },
  {
    name: "Proxmox",
    description: "Virtualization and container platform",
    category: "msp" as const,
    url: "https://www.proxmox.com",
  },
  {
    name: "Linux",
    description: "Ubuntu / Debian – Enterprise Linux distributions",
    category: "msp" as const,
    url: "https://www.linux.org",
  },
]

const creativeTech = [
  {
    name: "Ableton Live",
    description: "Digital audio workstation for production and live performance",
    category: "creative" as const,
    url: "https://www.ableton.com",
  },
  {
    name: "Behringer",
    description: "Studio hardware, interfaces, and signal processing",
    category: "creative" as const,
    url: "https://www.behringer.com",
  },
  {
    name: "sE Electronics",
    description: "Professional microphones for studio and vocal recording",
    category: "creative" as const,
    url: "https://www.seelectronics.com",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

interface PartnerCardProps {
  partner: {
    name: string
    description: string
    category: "authorized" | "networking" | "cctv" | "msp" | "creative"
    url?: string
  }
  index: number
}

const PartnerCard = ({ partner, index }: PartnerCardProps) => {
  const getCategoryStyles = () => {
    switch (partner.category) {
      case "authorized":
        return "border-teal-400/40 hover:border-teal-400/80 hover:shadow-teal-400/30"
      case "networking":
        return "border-blue-400/30 hover:border-blue-400/70 hover:shadow-blue-400/20"
      case "cctv":
        return "border-orange-400/30 hover:border-orange-400/70 hover:shadow-orange-400/20"
      case "msp":
        return "border-cyan-400/30 hover:border-cyan-400/70 hover:shadow-cyan-400/20"
      case "creative":
        return "border-purple-400/30 hover:border-purple-400/70 hover:shadow-purple-400/20"
      default:
        return "border-teal-400/30 hover:border-teal-400/60"
    }
  }

  const getCategoryIcon = () => {
    switch (partner.category) {
      case "authorized":
        return <Award size={20} className="text-teal-400" />
      case "networking":
        return <Network size={20} className="text-blue-400" />
      case "cctv":
        return <Cctv size={20} className="text-orange-400" />
      case "msp":
        return <Cloud size={20} className="text-cyan-400" />
      case "creative":
        return <Music2 size={20} className="text-purple-400" />
    }
  }

  const CardContent = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {getCategoryIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-400 transition-colors">
              {partner.name}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {partner.description}
            </p>
          </div>
        </div>
      </div>
    </>
  )

  const cardClassName = `
    glassmorphism p-6 rounded-xl card-hover border transition-all duration-300
    ${getCategoryStyles()}
    group relative overflow-hidden
    hover:shadow-xl
  `

  if (partner.url) {
    return (
      <motion.a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.03, y: -6 }}
        className={cardClassName}
      >
        <CardContent />
      </motion.a>
    )
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -6 }}
      className={cardClassName}
    >
      <CardContent />
    </motion.div>
  )
}

interface PartnershipSectionProps {
  title: string
  subtitle?: string
  partners: typeof authorizedPartners | typeof networkingProducts | typeof cctvProducts | typeof mspPlatforms | typeof creativeTech
  icon?: React.ReactNode
}

const PartnershipSection = ({ title, subtitle, partners, icon }: PartnershipSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-20"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-teal-400">{icon}</div>}
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-white bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      
      {subtitle && (
        <p className="text-gray-300 mb-8 max-w-3xl text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {partners.map((partner, index) => (
          <PartnerCard key={`${partner.name}-${index}`} partner={partner} index={index} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function PartnersPage() {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <Header />
        
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-400/20 mb-6">
                <Building2 size={40} className="text-teal-400" />
              </div>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4">
                Partners & Clientele
              </h1>
              <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive directory of our technology partnerships, authorized vendors, and trusted client relationships
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism p-8 rounded-xl mb-16 border border-teal-400/30"
            >
              <div className="flex items-start gap-4">
                <Users size={32} className="text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4">Our Partnership Network</h2>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                    Arwindpianist Multimedia & Consulting maintains strategic partnerships with leading technology manufacturers and service providers. Our authorized partner status ensures access to genuine products, manufacturer warranties, competitive pricing, and expert technical support.
                  </p>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    We serve a diverse clientele across various industries, from small businesses to large enterprises, providing tailored IT solutions that drive business success.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Partnership Sections */}
            <PartnershipSection
              title="Authorized Technology Partners"
              subtitle="Officially authorized to deliver, integrate, and support enterprise-grade platforms."
              partners={authorizedPartners}
              icon={<Award size={28} />}
            />

            <PartnershipSection
              title="Networking Products & Solutions"
              subtitle="Enterprise networking infrastructure, switching, routing, and wireless solutions."
              partners={networkingProducts}
              icon={<Network size={28} />}
            />

            <PartnershipSection
              title="CCTV & Surveillance Systems"
              subtitle="Design, supply, installation, and maintenance of IP-based surveillance systems."
              partners={cctvProducts}
              icon={<Cctv size={28} />}
            />

            <PartnershipSection
              title="MSP & Cloud Platforms"
              subtitle="Comprehensive managed services and cloud infrastructure for enterprise IT operations."
              partners={mspPlatforms}
              icon={<Cloud size={28} />}
            />

            <PartnershipSection
              title="Creative & Audio Technology Stack"
              subtitle="Professional tools and platforms for production workflows and creative technology services."
              partners={creativeTech}
              icon={<Music2 size={28} />}
            />

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-20"
            >
              <div className="glassmorphism p-8 rounded-xl max-w-2xl mx-auto border-2 border-teal-400/50">
                <h3 className="text-xl md:text-2xl font-bold mb-4">Become a Partner or Client</h3>
                <p className="text-sm md:text-base text-gray-300 mb-6">
                  Interested in partnering with us or becoming a client? Let's discuss how we can work together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary">
                    Get in Touch
                  </Link>
                  <Link href="/services" className="btn-secondary">
                    View Our Services
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
