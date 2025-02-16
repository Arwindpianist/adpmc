import Link from "next/link"

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          Your One-Stop Solution for Multimedia & IT Consulting
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          From music production to full-stack development, we bring your creative and technical visions to life.
        </p>
        <Link href="#features" className="btn-primary animate-fade-in-up animation-delay-600">
          Explore Our Services
        </Link>
      </div>
    </section>
  )
}

export default Hero

