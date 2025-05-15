import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="py-12 glassmorphism">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Arwindpianist Multimedia & Consulting (JR0170970-M)</h3>
            <p className="text-gray-400">Multimedia & Consulting services for all your creative and technical needs.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.arwindpianist.store/#features" className="text-gray-400 hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="https://www.arwindpianist.store/#testimonials" className="text-gray-400 hover:text-white transition duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="https://www.arwindpianist.store/#pricing" className="text-gray-400 hover:text-white transition duration-300">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/adpmnc/" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/arwindpianist-multimedia-consulting/" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Arwindpianist Multimedia & Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

