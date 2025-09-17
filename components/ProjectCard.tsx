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
        
        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(url)}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success && data.screenshotUrl) {
            setImageUrl(data.screenshotUrl);
          } else {
            // If no screenshot URL, the API returned a placeholder SVG
            setImageUrl(`/api/screenshot?url=${encodeURIComponent(url)}`);
          }
        } else {
          setImageError(true);
        }
      } catch (error) {
        console.error('Error generating screenshot:', error);
        setImageError(true);
      } finally {
        setLoading(false);
      }
    };

    const getGitHubPreviewImage = () => {
      try {
        // Extract repository name from GitHub URL
        const urlParts = url.split('/');
        const repoIndex = urlParts.findIndex(part => part === 'github.com');
        if (repoIndex !== -1 && urlParts[repoIndex + 1] && urlParts[repoIndex + 2]) {
          const owner = urlParts[repoIndex + 1];
          const repo = urlParts[repoIndex + 2];
          // Use GitHub's social preview image
          return `https://opengraph.githubassets.com/${owner}/${repo}`;
        }
      } catch (error) {
        console.error('Error parsing GitHub URL:', error);
      }
      return null;
    };

    if (fallbackImage) {
      setImageUrl(fallbackImage);
      setLoading(false);
    } else if (isDeployed) {
      generateScreenshot();
    } else if (url.includes('github.com')) {
      // For GitHub repositories, use GitHub's social preview image
      const githubImage = getGitHubPreviewImage();
      if (githubImage) {
        setImageUrl(githubImage);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [url, isDeployed, fallbackImage]);

  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  return (
    <div className="glassmorphism p-4 sm:p-6 rounded-lg transition duration-300 hover:scale-105">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative h-40 sm:h-48 mb-3 sm:mb-4 bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-400"></div>
            </div>
          ) : imageError || !imageUrl ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="text-gray-400 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-medium">{title}</p>
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
        
        <h3 className="text-lg sm:text-xl font-bold mb-2">
          {title}
          {isDeployed && (
            <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2 block sm:inline">
              ({new URL(url).hostname})
            </span>
          )}
        </h3>
      </a>
      
      <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 hover:underline text-xs sm:text-sm text-center sm:text-left py-1 px-2 rounded bg-teal-400/10 hover:bg-teal-400/20 transition-colors"
        >
          {isDeployed ? 'Visit Site' : 'View Project'}
        </a>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline text-xs sm:text-sm text-center sm:text-left py-1 px-2 rounded bg-teal-400/10 hover:bg-teal-400/20 transition-colors"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
