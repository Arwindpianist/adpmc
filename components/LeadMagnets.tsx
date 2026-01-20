"use client"

import { Calendar, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const LeadMagnets = () => {

  const whatsappUrl = "https://wa.me/message/E55QFBV5K3CGH1"
  
  const openWhatsApp = () => {
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">Get Started Today</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Schedule a free consultation with our experts. We'll help you find the right solutions for your business.
          </p>
        </motion.div>

        {/* Single Centered Consultation Card */}
        <div className="flex justify-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glassmorphism p-4 md:p-8 rounded-xl border border-teal-400/30 w-full"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-teal-400/20 mb-3 md:mb-4">
                <Calendar size={24} className="w-6 h-6 md:w-8 md:h-8 text-teal-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Free Consultation</h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                Discuss your IT needs with our experts. We'll help you find the right solutions for your business.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-4 md:mb-6 text-xs md:text-sm text-gray-400">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Video size={14} className="md:w-4 md:h-4 text-teal-400" />
                  <span>Virtual or Physical</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Clock size={14} className="md:w-4 md:h-4 text-teal-400" />
                  <span>30 Minutes</span>
                </div>
              </div>
              <Button
                onClick={openWhatsApp}
                className="btn-primary w-full md:w-auto text-sm md:text-base px-4 md:px-8 py-2 md:py-3"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LeadMagnets

