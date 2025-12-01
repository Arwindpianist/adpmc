import Link from "next/link"
import Typewriter from "react-ts-typewriter"

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-32 pb-20">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <Link href="#features" className="btn-primary">
            Explore Our Services
          </Link>
          <Link href="#pricing" className="btn-secondary">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero