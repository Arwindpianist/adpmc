const testimonials = [
  {
    quote: "Arwindpianist took my music to the next level. Their production quality is unmatched!",
    author: "Bob Marley, Independent Artist",
  },
  {
    quote: "The web application they built for our business has streamlined our operations significantly.",
    author: "Mark T., CEO of TechCorp",
  },
  {
    quote: "Their mobile app development skills are top-notch. Our app has seen a 200% increase in user engagement.",
    author: "Mark Z., CEO of Company Inc.",
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
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

