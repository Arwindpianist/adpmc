import Link from "next/link"
import Typewriter from "react-ts-typewriter"
import { ExternalLink } from "lucide-react"

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center py-20">
      <div className="container mx-auto px-4">
        {/* Centered H1 */}
        <div className="flex justify-center">
          <h1 className="text-xl md:text-4xl font-bold mb-6 animate-fade-in-up">
            <Typewriter
              text="Arwindpianist Multimedia & Consulting"
              speed={100}
            />
          </h1>
        </div>
        <h2 className="text-2xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          Your Trusted Managed Service Provider & IT Solutions Partner
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
          Comprehensive MSP services, IT hardware sales (new & refurbished), software solutions, music production services, and IT/Construction consulting. Authorized partnerships with Extreme Networks, Aruba, Huawei, and IBM.
        </p>
        
        {/* Featured Product: MyceliumLink */}
        <div className="mb-8 animate-fade-in-up animation-delay-400">
          <div className="glassmorphism p-6 rounded-lg max-w-2xl mx-auto border-2 border-teal-400/50">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-teal-400">
              Featured Product: MyceliumLink
            </h3>
            <p className="text-lg mb-4 text-gray-300">
              Our latest innovation in network solutions and connectivity
            </p>
            <a
              href="https://myceliumlink.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary bg-teal-500 hover:bg-teal-600"
            >
              Explore MyceliumLink
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <Link href="#features" className="btn-primary">
            Explore Our Services
          </Link>
          <Link href="#pricing" className="btn-primary bg-transparent border-2 border-teal-400 hover:bg-teal-400/10">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero