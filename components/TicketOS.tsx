"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Zap, Shield, BarChart3, X, Mail } from "lucide-react"

// Video sequence in order: dashboard, contracts, tickets, branding
// Using WebP animated images - each plays its full animation without time limits
const videos = [
  { src: "/videos/ticketos-dashboard.webp", title: "Dashboard" },
  { src: "/videos/ticketos-contracts.webp", title: "Contracts" },
  { src: "/videos/ticketos-tickets.webp", title: "Tickets" },
  { src: "/videos/ticketos-branding.webp", title: "Branding" },
]

const TicketOS = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  // Email link with pre-formatted message
  const emailSubject = encodeURIComponent("TicketOS Access Request")
  const emailBody = encodeURIComponent("Hello,\n\nI would like to be a part of the TicketOS system and am interested in learning more about this exclusive platform.\n\nThank you!")
  const emailLink = `mailto:hello@arwindpianist.com?subject=${emailSubject}&body=${emailBody}`

  const benefits = [
    {
      icon: <BarChart3 size={20} className="text-teal-400" />,
      text: "Save time with an all-in-one dashboard",
    },
    {
      icon: <Shield size={20} className="text-teal-400" />,
      text: "Avoid contract overages with scope-aware tracking",
    },
    {
      icon: <Zap size={20} className="text-teal-400" />,
      text: "Deliver branded client portal experience",
    },
    {
      icon: <CheckCircle2 size={20} className="text-teal-400" />,
      text: "Increase operational efficiency and accountability",
    },
  ]

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                TicketOS
              </span>
              {" "}— Smarter Ticketing & Contract Management
            </h2>
            
            <p className="text-base md:text-xl text-gray-300 mb-6 leading-relaxed">
              Centralize your tickets, contracts, and branding in one streamlined portal
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              TicketOS revolutionizes how you manage client relationships with centralized ticketing, 
              scope-aware contracts, and white-labeled branding. Streamline operations, prevent 
              contract overages, and deliver a professional client portal that reflects your brand.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {benefit.icon}
                  </div>
                  <span className="text-gray-300 leading-relaxed">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                onClick={() => setShowModal(true)}
                className="btn-primary text-sm md:text-lg px-4 md:px-8 py-2 md:py-4"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Turnstile Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="glassmorphism rounded-2xl overflow-hidden shadow-2xl shadow-teal-400/10 relative">
              {/* Turnstile Video Container */}
              <div 
                className="relative w-full aspect-video bg-black/20"
                style={{
                  contain: 'layout style paint',
                  isolation: 'isolate',
                }}
              >
                {/* Animated WebP Images - Turnstile Style */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentVideoIndex}
                    src={videos[currentVideoIndex].src}
                    alt={`TicketOS ${videos[currentVideoIndex].title} feature showcase`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      willChange: 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      imageRendering: 'auto',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    loading="eager"
                  />
                </AnimatePresence>

                {/* Subtle gradient overlay for better text contrast */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10"
                  style={{ willChange: 'auto' }}
                />

                {/* Video Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {videos.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentVideoIndex
                          ? 'bg-teal-400 w-6'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`View ${video.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Video Features Hint (Desktop only) */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-gray-500 text-center mt-4 hidden lg:block"
            >
              {videos[currentVideoIndex].title} • Click dots to navigate
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* TicketOS Exclusive Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glassmorphism rounded-2xl p-8 max-w-md w-full border border-teal-400/30 shadow-2xl relative">
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                {/* Modal Content */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-400/20 mb-6">
                    <Shield size={32} className="text-teal-400" />
                  </div>

                  <h3 className="text-xl md:text-3xl font-bold mb-4">
                    Exclusive In-House Software
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    TicketOS is our exclusive, in-house software platform dedicated exclusively to our valued customers. 
                    This premium solution is designed to transform how you manage client relationships, tickets, and contracts.
                  </p>

                  <p className="text-gray-400 mb-8 text-sm">
                    If you're interested in being part of this exclusive system, click below to send us an inquiry.
                  </p>

                  {/* Email Button */}
                  <a
                    href={emailLink}
                    onClick={(e) => {
                      // Don't prevent default - let the mailto link work
                      setShowModal(false)
                    }}
                    className="btn-primary inline-flex items-center gap-2 text-sm md:text-lg px-4 md:px-8 py-2 md:py-4 w-full justify-center md:w-auto"
                  >
                    <Mail size={20} />
                    Request Access
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TicketOS
