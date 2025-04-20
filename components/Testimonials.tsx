const testimonials = [
  {
    quote: "I recently used this website and I couldn't be happier with my experience! The layout is simple and catchy, making it incredibly easy to navigate. I was able to quickly view and choose the services I needed without any hassle. Plus, their response time is impressively fast! I highly recommend this site to anyone looking for a user-friendly experience!",
    author: "Dr. Kanesan Muthusamy, KM Training and Consulting Services (KMTCS)",
  },
  {
    quote: "@arwindpianist has been making wonderful music just as I’ve always asked and he puts a soul into every music he makes. He is also super efficient and is easy to deal with. The end product after mixing will always be mind blowing and he is just one amazing of a talent.",
    author: "Lohith Selan, Influencer/Singer",
  },
  {
    quote: "The cybersecurity team implemented a robust CVE screening system that transformed our vulnerability management. Their solution automated detection of critical vulnerabilities, reducing our patching response time by 80%. Their expertise in threat intelligence and seamless integration with our existing infrastructure was impressive. A must-have for any security-conscious enterprise!",
    author: "Dinesh Pandian, Director of Solara Systems",
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-40">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-right">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

