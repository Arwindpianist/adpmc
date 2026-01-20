"use client"

import { motion } from "framer-motion"
import { Award, Cloud, Music2, Network, Cctv, ArrowRight } from "lucide-react"
import Link from "next/link"

/**
 * Partnerships Component
 * 
 * Data-driven component for displaying partnerships and products across five categories:
 * 1. Authorized Technology Partners - Officially authorized vendors
 * 2. Networking Products & Solutions - Enterprise networking equipment
 * 3. CCTV & Surveillance Systems - IP-based surveillance solutions
 * 4. MSP & Cloud Platforms - Managed services and cloud infrastructure
 * 5. Creative & Audio Technology Stack - Professional creative tools
 * 
 * To add new partners/products:
 * - Add entry to the appropriate array
 * - Format: { name: "Partner Name", description: "Description text", category: "category" as const }
 * - Categories: "authorized" | "networking" | "cctv" | "msp" | "creative"
 */

// Authorized Technology Partners - Officially authorized vendors
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

// Networking Products & Solutions
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

// CCTV & Surveillance Systems
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

// MSP & Cloud Platforms
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

// Creative & Audio Technology Stack
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
      staggerChildren: 0.08,
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
        return <Award size={16} className="md:w-5 md:h-5 text-teal-400" />
      case "networking":
        return <Network size={16} className="md:w-5 md:h-5 text-blue-400" />
      case "cctv":
        return <Cctv size={16} className="md:w-5 md:h-5 text-orange-400" />
      case "msp":
        return <Cloud size={16} className="md:w-5 md:h-5 text-cyan-400" />
      case "creative":
        return <Music2 size={16} className="md:w-5 md:h-5 text-purple-400" />
    }
  }

  const CardContent = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="mt-0.5 md:mt-1 opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0">
            {getCategoryIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 group-hover:text-teal-400 transition-colors line-clamp-1">
              {partner.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-none">
              {partner.description}
            </p>
          </div>
        </div>
      </div>
    </>
  )

  const cardClassName = `
    glassmorphism p-3 md:p-6 rounded-lg md:rounded-xl card-hover border transition-all duration-300
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
      className="mb-12 md:mb-16 lg:mb-20"
    >
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        {icon && <div className="text-teal-400 scale-75 md:scale-100">{icon}</div>}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-white bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      
      {subtitle && (
        <p className="text-gray-300 mb-6 md:mb-8 max-w-3xl text-xs md:text-sm lg:text-base leading-relaxed">
          {subtitle}
        </p>
      )}

      <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6"
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

const Partnerships = () => {
  return (
    <section id="partnerships" className="py-16 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title mb-4">Partnerships & Technology Ecosystem</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base lg:text-lg px-4">
            Full-stack MSP, systems integrator, and digital services provider delivering enterprise-grade solutions across networking, surveillance, cloud platforms, and creative technology.
          </p>
          <Link 
            href="/partners"
            className="inline-flex items-center gap-2 mt-6 text-teal-400 hover:text-teal-300 transition-colors text-sm md:text-base"
          >
            View Full Partners & Clientele Directory
            <ArrowRight size={18} />
          </Link>
        </motion.div>

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
      </div>
    </section>
  )
}

export default Partnerships
