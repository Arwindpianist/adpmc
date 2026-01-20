"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Sparkles } from 'lucide-react';
import { createCheckoutSession } from '@/lib/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceId?: string;
}

const PaymentModal = ({ isOpen, onClose, priceId }: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we're mounted before rendering portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Default to environment variable if priceId not provided
  const stripePriceId = priceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || '';

  const handlePurchase = async () => {
    if (!stripePriceId) {
      alert('Price ID not configured. Please set NEXT_PUBLIC_STRIPE_PRICE_ID in your environment variables.');
      return;
    }

    setLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(stripePriceId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert('Failed to create checkout session. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glassmorphism p-6 md:p-8 rounded-xl max-w-md w-full relative border border-white/20 pointer-events-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 mb-4">
                  <Lock size={32} className="text-teal-400" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Unlock GitHub Access
                </h2>
                <p className="text-gray-300 mb-6">
                  Get access to all GitHub repository source code and implementations
                </p>

                {/* Features */}
                <div className="text-left space-y-3 mb-6 bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} className="text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Full Repository Access</h3>
                      <p className="text-xs text-gray-400">Browse all source code and project implementations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} className="text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Lifetime Access</h3>
                      <p className="text-xs text-gray-400">One-time payment for permanent access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} className="text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">All Projects Included</h3>
                      <p className="text-xs text-gray-400">Access to current and future GitHub repositories</p>
                    </div>
                  </div>
                </div>

                {/* Purchase button */}
                <motion.button
                  onClick={handlePurchase}
                  disabled={loading || !stripePriceId}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Purchase Access
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-400 mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default PaymentModal;
