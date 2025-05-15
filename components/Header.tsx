"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import SVGIMG from "../public/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="glassmorphism fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image src={SVGIMG} alt="Logo" width={50} height={50} />
        </Link>
        <div className="hidden md:flex space-x-6 justify-center items-center flex-grow">
          <motion.a
            href="/artists"
            className="hover:text-gray-300 transition duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Artists
          </motion.a>
          <motion.a
            href="https://arwindpianist.store"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Company
          </motion.a>
        </div>
        <motion.a
          href="https://www.arwindpianist.store/#pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden md:block whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enquire
        </motion.a>
        <button className="md:hidden" onClick={toggleMenu}>
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
              href="/artists"
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Artists
            </motion.a>
            <motion.a
              href="https://arwindpianist.store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Company
            </motion.a>
            <motion.a
              href="https://www.arwindpianist.store/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enquire Now
            </motion.a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

