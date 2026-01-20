"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Building2, Wrench, MessageSquare, DollarSign, FolderKanban, Info, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import SVGIMG from "../public/logo.svg";
import { Drawer } from "vaul";

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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          onClick={(e) => scrollToSection(e, "")}
          className="text-xl font-bold"
        >
          <Image src={SVGIMG} alt="Logo" width={40} height={40} />
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
              href="/partners"
              className="relative hover:text-teal-400 transition-colors duration-300 group"
            >
              Partners
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
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
          className="hidden md:block btn-primary text-sm px-6 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => scrollToSection(e, "pricing")}
        >
          Get Started
        </motion.button>
        {/* Mobile Menu Button */}
        <Drawer.Root direction="bottom" open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <Drawer.Trigger asChild>
            <motion.button 
              className="md:hidden"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <Drawer.Content className="glassmorphism fixed bottom-0 left-0 right-0 z-50 flex h-[85vh] max-h-[85vh] flex-col rounded-t-[20px] border-t border-white/20 bg-slate-900/80 backdrop-blur-xl pb-safe">
              {/* Handle */}
              <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-500/60 flex-shrink-0" />
              
              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <nav className="flex flex-col space-y-1">
                  <Drawer.Close asChild>
                    <Link
                      href="/services"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium"
                    >
                      <Wrench size={20} className="text-teal-400 flex-shrink-0" />
                      <span>Services</span>
                    </Link>
                  </Drawer.Close>
                  
                  <Drawer.Close asChild>
                    <button
                      onClick={(e) => scrollToSection(e, "testimonials")}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium text-left w-full"
                    >
                      <MessageSquare size={20} className="text-teal-400 flex-shrink-0" />
                      <span>Testimonials</span>
                    </button>
                  </Drawer.Close>
                  
                  <Drawer.Close asChild>
                    <button
                      onClick={(e) => scrollToSection(e, "pricing")}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium text-left w-full"
                    >
                      <DollarSign size={20} className="text-teal-400 flex-shrink-0" />
                      <span>Pricing</span>
                    </button>
                  </Drawer.Close>
                  
                  <Drawer.Close asChild>
                    <Link
                      href="/partners"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium"
                    >
                      <Building2 size={20} className="text-teal-400 flex-shrink-0" />
                      <span>Partners</span>
                    </Link>
                  </Drawer.Close>
                  
                  <Drawer.Close asChild>
                    <Link
                      href="/projects"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium"
                    >
                      <FolderKanban size={20} className="text-teal-400 flex-shrink-0" />
                      <span>Projects</span>
                    </Link>
                  </Drawer.Close>
                  
                  <Drawer.Close asChild>
                    <Link
                      href="/about"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium"
                    >
                      <Info size={20} className="text-teal-400 flex-shrink-0" />
                      <span>About</span>
                    </Link>
                  </Drawer.Close>
                  
                  <Drawer.Close asChild>
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base font-medium"
                    >
                      <Mail size={20} className="text-teal-400 flex-shrink-0" />
                      <span>Contact</span>
                    </Link>
                  </Drawer.Close>
                  
                  {/* CTA Button */}
                  <Drawer.Close asChild>
                    <button
                      onClick={(e) => scrollToSection(e, "pricing")}
                      className="btn-primary mt-4 w-full"
                    >
                      Get Started
                    </button>
                  </Drawer.Close>
                </nav>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </header>
  );
};

export default Header;

