import { Music, Code, Smartphone, Laptop } from "lucide-react"

const features = [
  {
    icon: <Music size={40} />,
    title: "Music Production",
    description: "Complete music production services from composition to distribution for artists of all levels.",
  },
  {
    icon: <Code size={40} />,
    title: "Web Development",
    description: "Custom full-stack web applications tailored to your business needs.",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile Apps",
    description: "Native mobile applications for iOS and Android platforms.",
  },
  {
    icon: <Laptop size={40} />,
    title: "Desktop Software",
    description: "Powerful desktop applications to streamline your business processes.",
  },
]

const Features = () => {
  return (
    <section id="features" className="py-40">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
              <div className="text-white mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

