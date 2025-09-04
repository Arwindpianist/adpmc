"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  isDeployed?: boolean;
  fallbackImage?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  url, 
  githubUrl, 
  isDeployed = false,
  fallbackImage 
}: ProjectCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateScreenshot = async () => {
      try {
        setLoading(true);
        setImageError(false);
        const screenshotUrl = `/api/screenshot?url=${encodeURIComponent(url)}`;
        setImageUrl(screenshotUrl);
      } catch (error) {
        console.error('Error generating screenshot:', error);
        setImageError(true);
      } finally {
        setLoading(false);
      }
    };

    if (isDeployed) {
      generateScreenshot();
    } else if (fallbackImage) {
      setImageUrl(fallbackImage);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [url, isDeployed, fallbackImage]);

  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  return (
    <div className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative h-48 mb-4 bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
            </div>
          ) : imageError || !imageUrl ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="text-gray-400 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-gray-500 mt-1">Live Preview</p>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              onError={handleImageError}
              unoptimized
            />
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2">
          {title}
          {isDeployed && (
            <span className="text-gray-400 text-sm ml-2">
              ({new URL(url).hostname})
            </span>
          )}
        </h3>
      </a>
      
      <p className="text-gray-400 mb-4">
        {description}
      </p>
      
      <div className="flex gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 hover:underline text-sm"
        >
          {isDeployed ? 'Visit Site' : 'View Project'}
        </a>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline text-sm"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
