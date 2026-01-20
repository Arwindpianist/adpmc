"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyPaymentSession, setPaymentStatus } from '@/lib/payment';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const verifyPayment = async () => {
      const verified = await verifyPaymentSession(sessionId);
      if (verified) {
        setStatus('success');
        
        // Set cookie for server-side verification (1 year expiry)
        if (typeof document !== 'undefined') {
          const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
          document.cookie = `github_access_paid=true; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax; Secure`;
        }
        
        // Trigger storage event so other tabs/components update
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('storage'));
        }
        
        // Redirect to projects page after 3 seconds
        setTimeout(() => {
          router.push('/projects');
        }, 3000);
      } else {
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <div className="glassmorphism p-8 md:p-12 rounded-xl max-w-md w-full mx-4 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-teal-400 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
            <p className="text-gray-400">Please wait while we confirm your payment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-green-400">Payment Successful!</h2>
            <p className="text-gray-300 mb-6">
              You now have access to all GitHub repositories. Redirecting to projects...
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-400/10 hover:bg-teal-400/20 text-teal-400 hover:text-white font-medium transition-all duration-300 border border-teal-400/20 hover:border-teal-400/40"
            >
              Go to Projects
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-red-400">Payment Verification Failed</h2>
            <p className="text-gray-300 mb-6">
              We couldn't verify your payment. Please contact support if you've already paid.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white font-medium transition-all duration-300"
            >
              Back to Projects
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
