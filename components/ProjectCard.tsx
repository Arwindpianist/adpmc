"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Code, Zap, Lock } from 'lucide-react';
import { getPaymentStatus } from '@/lib/payment';
import PaymentModal from './PaymentModal';

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  projectId?: string; // Hashed project ID, not the actual GitHub URL
  isDeployed?: boolean;
  isGitHubRepo?: boolean; // Flag to indicate if this is a GitHub repo
  fallbackImage?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  url, 
  projectId,
  isDeployed = false,
  isGitHubRepo = false
}: ProjectCardProps) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loadingUrl, setLoadingUrl] = useState(false);
  
  // Store projectId in a closure to prevent DOM inspection
  // This reference is not exposed in the component's render output
  const projectIdRef = { current: projectId };

  useEffect(() => {
    setHasAccess(getPaymentStatus());
    
    // Listen for payment status changes (e.g., after successful payment)
    const handleStorageChange = () => {
      setHasAccess(getPaymentStatus());
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also check on focus (in case payment completed in another tab)
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const handleUnlockClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!hasAccess) {
      setShowPaymentModal(true);
      return;
    }

    // If user has access, fetch GitHub URL server-side
    // Use ref to avoid exposing projectId in function scope
    const currentProjectId = projectIdRef.current;
    if (currentProjectId && isGitHubRepo) {
      setLoadingUrl(true);
      try {
        const response = await fetch('/api/get-github-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectId: currentProjectId }),
        });

        const data = await response.json();
        
        if (data.url) {
          // Open in new tab
          window.open(data.url, '_blank', 'noopener,noreferrer');
        } else {
          alert('Unable to access repository. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      } finally {
        setLoadingUrl(false);
      }
    }
  };

  // Update access status when modal closes (in case payment was completed)
  const handleModalClose = () => {
    setShowPaymentModal(false);
    setHasAccess(getPaymentStatus());
  };
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const getProjectIcon = () => {
    if (isDeployed) return <Globe size={24} className="text-teal-400" />;
    if (isGitHubRepo) return <Code size={24} className="text-teal-400" />;
    return <Code size={24} className="text-teal-400" />;
  };

  // Generate a gradient based on the project name for visual variety
  const getGradient = (name: string) => {
    const gradients = [
      'from-teal-500/20 via-cyan-500/10 to-teal-500/20',
      'from-purple-500/20 via-pink-500/10 to-purple-500/20',
      'from-blue-500/20 via-indigo-500/10 to-blue-500/20',
      'from-emerald-500/20 via-teal-500/10 to-emerald-500/20',
      'from-orange-500/20 via-red-500/10 to-orange-500/20',
    ];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glassmorphism p-5 md:p-6 rounded-xl card-hover group relative overflow-hidden border border-white/10"
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(title)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-teal-400/10 group-hover:bg-teal-400/20 transition-colors">
              {getProjectIcon()}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold group-hover:text-teal-400 transition-colors">
                {title}
              </h3>
              {isDeployed && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-400 text-xs font-medium">
                    <Zap size={12} />
                    Live
                  </span>
                  <span className="text-xs text-gray-500">{getDomain(url)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm md:text-base text-gray-300 mb-5 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {/* For deployed projects, show Visit Site button */}
          {isDeployed && (
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-400/10 hover:bg-teal-400/20 text-teal-400 hover:text-white text-sm font-medium transition-all duration-300 border border-teal-400/20 hover:border-teal-400/40"
            >
              <Globe size={16} />
              Visit Site
            </motion.a>
          )}

          {/* For GitHub repos, only show unlock button (no direct link) */}
          {isGitHubRepo && (
            <motion.button
              onClick={handleUnlockClick}
              disabled={loadingUrl}
              whileHover={{ scale: hasAccess && !loadingUrl ? 1.05 : 1 }}
              whileTap={{ scale: hasAccess && !loadingUrl ? 0.95 : 1 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                hasAccess && !loadingUrl
                  ? 'bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white border-white/10 hover:border-white/20'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border-amber-500/20 hover:border-amber-500/40'
              } ${loadingUrl ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
            >
              {loadingUrl ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400" />
                  Loading...
                </>
              ) : hasAccess ? (
                <>
                  <Code size={16} />
                  View Code
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Unlock Code
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleModalClose}
      />
    </motion.div>
  );
};

export default ProjectCard;
