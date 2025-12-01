import { Music, Server, ShoppingCart, Code, Wrench, Building2 } from "lucide-react"

const features = [
  {
    icon: <Server size={40} />,
    title: "Managed IT Services",
    description: "Comprehensive managed service provider solutions including network management, cloud services, cybersecurity, and 24/7 IT support for businesses of all sizes.",
  },
  {
    icon: <ShoppingCart size={40} />,
    title: "IT Hardware Sales",
    description: "New and refurbished IT hardware including networking equipment, servers, storage solutions, and enterprise-grade devices from leading manufacturers.",
  },
  {
    icon: <Code size={40} />,
    title: "Software Solutions",
    description: "Custom software development, enterprise applications, cloud solutions, and system integrations tailored to your business requirements.",
  },
  {
    icon: <Music size={40} />,
    title: "Music Production Solutions",
    description: "Professional music production services, audio engineering, studio setup, and music technology consulting for artists and studios.",
  },
  {
    icon: <Wrench size={40} />,
    title: "IT Consulting",
    description: "Expert IT consulting services for infrastructure planning, technology strategy, digital transformation, and enterprise architecture.",
  },
  {
    icon: <Building2 size={40} />,
    title: "Construction IT",
    description: "Specialized IT solutions for construction projects including project management systems, site connectivity, and construction technology integration.",
  },
]

const brandPartners = [
  { name: "Extreme Networks", description: "Authorized Partner" },
  { name: "Aruba", description: "Authorized Partner" },
  { name: "Huawei", description: "Authorized Partner" },
  { name: "IBM", description: "Authorized Partner" },
]

const Features = () => {
  return (
    <section id="features" className="py-40">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
              <div className="text-white mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Brand Partnerships Section */}
        <div className="mt-16">
          <h2 className="section-title mb-8">Authorized Brand Partnerships</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            We maintain strong partnerships with leading technology manufacturers, ensuring access to the latest products, competitive pricing, and expert support.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandPartners.map((partner, index) => (
              <div key={index} className="glassmorphism p-6 rounded-lg text-center transition duration-300 hover:scale-105 border border-teal-400/30">
                <h3 className="text-lg font-semibold mb-2 text-teal-400">{partner.name}</h3>
                <p className="text-sm text-gray-400">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

