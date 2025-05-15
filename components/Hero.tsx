import Link from "next/link"
import Typewriter from "react-ts-typewriter"

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center py-20">
      <div className="container mx-auto px-4">
        {/* Centered H1 */}
        <div className="flex justify-center">
          <h1 className="text-xl md:text-4xl font-bold mb-6 animate-fade-in-up">
            <Typewriter
              text="Arwindpianist Studios"
              speed={100}
            />
          </h1>
        </div>
        <h2 className="text-2xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          Your One-Stop Solution for Independent Artists
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          From music production to distribution and marketing, we bring your creative visions to life.
        </p>
        <Link href="#features" className="btn-primary animate-fade-in-up animation-delay-600">
          Explore Our Artists
        </Link>
      </div>
    </section>
  )
}

export default Hero