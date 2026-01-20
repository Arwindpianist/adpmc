'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function createCheckoutSession(priceId: string): Promise<string | null> {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    return data.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
}

export function setPaymentStatus(paid: boolean) {
  if (typeof window !== 'undefined') {
    // Store in localStorage for client-side checks
    localStorage.setItem('github_access_paid', JSON.stringify({
      paid,
      timestamp: Date.now(),
    }));
    
    // Also set cookie for server-side verification
    document.cookie = `github_access_paid=${paid}; path=/; max-age=${paid ? 31536000 : 0}; SameSite=Lax`;
  }
}

export function getPaymentStatus(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const stored = localStorage.getItem('github_access_paid');
    if (!stored) return false;
    
    const data = JSON.parse(stored);
    
    // Check if payment status is still valid (optional: add expiration logic)
    return data.paid === true;
  } catch {
    return false;
  }
}

export async function verifyPaymentSession(sessionId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    const data = await response.json();

    if (data.paid) {
      setPaymentStatus(true);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
}
