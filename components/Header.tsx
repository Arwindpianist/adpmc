"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import to get the current route
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import SVGIMG from "../public/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, sectionId: string) => {
    e.preventDefault();
    if (pathname === "/") {
      // If on the main page, scroll to the section
      if (sectionId === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // If not on the main page, navigate to the main page with the section ID
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="glassmorphism fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          onClick={(e) => scrollToSection(e, "")}
          className="text-xl font-bold"
        >
          <Image src={SVGIMG} alt="Logo" width={50} height={50} />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/services"
              className="relative hover:text-teal-400 transition-colors duration-300 group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
          <motion.a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, "testimonials")}
            className="relative hover:text-teal-400 transition-colors duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
          </motion.a>
          <motion.a
            href="#pricing"
            onClick={(e) => scrollToSection(e, "pricing")}
            className="relative hover:text-teal-400 transition-colors duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/projects"
              className="relative hover:text-teal-400 transition-colors duration-300 group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/about"
              className="relative hover:text-teal-400 transition-colors duration-300 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="relative hover:text-teal-400 transition-colors duration-300 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
        </nav>
        <motion.button
          className="hidden md:block btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => scrollToSection(e, "pricing")}
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
            <Link
              href="/services"
              className="hover:text-gray-300 transition duration-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <motion.a
              href="#testimonials"
              onClick={(e) => scrollToSection(e, "testimonials")}
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Testimonials
            </motion.a>
            <motion.a
              href="#pricing"
              onClick={(e) => scrollToSection(e, "pricing")}
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pricing
            </motion.a>
            <Link
              href="/projects"
              className="hover:text-gray-300 transition duration-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-300 transition duration-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-300 transition duration-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

