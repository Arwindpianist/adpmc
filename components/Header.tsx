"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import SVGIMG from "../public/logo.svg"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="glassmorphism fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image src={SVGIMG} alt="Logo" width={50} height={50} />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <motion.a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="hover:text-gray-300 transition duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Services
          </motion.a>
          <motion.a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, 'testimonials')}
            className="hover:text-gray-300 transition duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Testimonials
          </motion.a>
          <motion.a
            href="#pricing"
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="hover:text-gray-300 transition duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pricing
          </motion.a>
        </nav>
        <motion.button 
          className="hidden md:block btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Get Started
        </motion.button>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.div 
          className="md:hidden glassmorphism"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex flex-col space-y-4 px-4 py-2">
            <motion.a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#testimonials"
              onClick={(e) => scrollToSection(e, 'testimonials')}
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Testimonials
            </motion.a>
            <motion.a
              href="#pricing"
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pricing
            </motion.a>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Get Started
            </motion.button>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Header

