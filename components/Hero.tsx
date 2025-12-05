"use client"

import Link from "next/link"
import Typewriter from "react-ts-typewriter"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-32 pb-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 animate-pulse" />
      
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Centered H1 */}
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <h1 className="text-xl md:text-4xl font-bold">
            <Typewriter
              text="Arwindpianist Multimedia & Consulting"
              speed={100}
            />
          </h1>
        </motion.div>
        
        <motion.h2
          className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-teal-200 to-white bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Your Trusted Managed Service Provider & IT Solutions Partner
        </motion.h2>
        
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          Comprehensive MSP services, IT hardware sales (new & refurbished), software solutions, music production services, and IT/Construction consulting. Authorized partnerships with Extreme Networks, Aruba, Huawei, and IBM.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/services" className="btn-primary inline-flex items-center gap-2 group">
              Explore Our Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#pricing" className="btn-secondary">
              Get a Quote
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero