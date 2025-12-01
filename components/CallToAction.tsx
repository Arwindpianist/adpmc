"use client"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const CallToAction = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 glassmorphism">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to Transform Your IT Infrastructure?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          Whether you need managed services, hardware solutions, custom software, or expert consulting, 
          we're here to help your business succeed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a 
            href="#pricing" 
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Free Quote
          </motion.a>
          <motion.a 
            href="https://myceliumlink.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 bg-transparent border-2 border-teal-400 hover:bg-teal-400/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore MyceliumLink
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-gray-400 mt-6 text-sm"
        >
          Or call us for immediate assistance
        </motion.p>
      </div>
    </section>
  )
}

export default CallToAction

