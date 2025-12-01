"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { RefreshCw } from "lucide-react";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
);

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  homepage?: string;
  fork: boolean;
}

interface DeployedProject {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  fallbackImage?: string;
  detected?: boolean;
}

interface DetectedProject {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  detected: boolean;
}

// Define deployed projects including the new ones
const deployedProjects: DeployedProject[] = [
  {
    title: "CasaLink",
    description: "A multi-tenant SaaS platform for residential condominiums, providing tools to manage residents, visitors, amenities, community engagement, security access, and communication in a single platform.",
    url: "https://casalink.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/CasaLink"
  },
  {
    title: "AS Kitchen",
    description: "A website showcasing AS Kitchen's services and menu.",
    url: "https://askitchen.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/askitchen",
    fallbackImage: "/images/askitchen-preview.png"
  },
  {
    title: "PogoPass",
    description: "Pogopass Password Manager official website.",
    url: "https://pogopass.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/pogopass",
    fallbackImage: "/images/pogopass-preview.png"
  },
  {
    title: "KMTCS",
    description: "Official website for KMTCS services and information.",
    url: "https://www.kmtcs.com.my/",
    githubUrl: "https://github.com/Arwindpianist/kmtcs"
  },
  {
    title: "TypeScript Tutor",
    description: "An interactive learning platform for mastering TypeScript through hands-on exercises, real-world examples, and interactive quizzes.",
    url: "https://typescripttutor.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/typescript-tutor"
  },
  {
    title: "Sunrise 2025",
    description: "A modern web application showcasing innovative design and development practices.",
    url: "https://sunrise-2025.com/",
    githubUrl: "https://github.com/Arwindpianist/sunrise-2025"
  },
  {
    title: "GridHealth",
    description: "Enterprise-grade system health monitoring platform. Monitor CPU, memory, disk, and network health across your entire organization in real-time with beautiful, intuitive dashboards.",
    url: "https://gridhealth.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/gridhealth"
  }
];

const ProjectsPage = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [detectedProjects, setDetectedProjects] = useState<DetectedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [detecting, setDetecting] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRepositories = useCallback(async (currentDetectedProjects: DetectedProject[] = []) => {
    try {
      const response = await fetch(
        "https://api.github.com/users/Arwindpianist/repos?per_page=100&sort=updated"
      );
      const data = await response.json();

      // Filter out deployed projects and forks, but include all repositories
      const allProjectNames = [
        ...deployedProjects.map(p => p.title.toLowerCase()),
        ...currentDetectedProjects.map(p => p.title.toLowerCase())
      ];
      const filteredData = data.filter((repo: Repository) => 
        !allProjectNames.includes(repo.name.toLowerCase()) &&
        !repo.fork // Exclude forked repositories
      );

      // Sort repositories by update date (newest first)
      const sortedData = filteredData.sort(
        (a: Repository, b: Repository) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      setRepositories(sortedData);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const detectProjects = useCallback(async () => {
    setDetecting(true);
    try {
      const response = await fetch("/api/detect-projects");
      const data = await response.json();
      
      if (data.success && data.projects) {
        setDetectedProjects(data.projects);
        // Refresh repositories after detecting projects
        fetchRepositories(data.projects);
      }
    } catch (error) {
      console.error("Error detecting projects:", error);
    } finally {
      setDetecting(false);
    }
  }, [fetchRepositories]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    detectProjects();
  };

  useEffect(() => {
    // Initial load
    detectProjects();
    fetchRepositories([]);
  }, [detectProjects, fetchRepositories]);

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      detectProjects();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [detectProjects]);

  // Merge detected projects with manually defined projects
  const allDeployedProjects: DeployedProject[] = [...deployedProjects];
  const detectedUrls = new Set(deployedProjects.map(p => new URL(p.url).hostname));
  
  for (const detected of detectedProjects) {
    const hostname = new URL(detected.url).hostname;
    if (!detectedUrls.has(hostname)) {
      allDeployedProjects.push({
        title: detected.title,
        description: detected.description,
        url: detected.url,
        githubUrl: detected.githubUrl,
        detected: true
      });
      detectedUrls.add(hostname);
    }
  }

  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        {/* Deployed Projects Section */}
        <section className="py-16 sm:py-24 lg:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
                Deployed Projects {detecting && <span className="text-sm text-gray-400">(Detecting...)</span>}
              </h2>
              <div className="flex items-center gap-4">
                {lastRefresh && (
                  <span className="text-sm text-gray-400">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                )}
                <button
                  onClick={handleManualRefresh}
                  disabled={refreshing || detecting}
                  className="flex items-center gap-2 btn-primary bg-transparent border-2 border-teal-400 hover:bg-teal-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={18} className={refreshing || detecting ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {allDeployedProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  url={project.url}
                  githubUrl={project.githubUrl}
                  isDeployed={true}
                  fallbackImage={project.fallbackImage}
                />
              ))}
              {allDeployedProjects.length === 0 && !detecting && (
                <div className="col-span-full text-center text-gray-400 py-12">
                  No deployed projects found. Projects are automatically detected from arwindpianist.com and arwindpianist.store.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GitHub Projects Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">
              GitHub Projects ({repositories.length} repositories)
            </h2>
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
                <p className="text-sm sm:text-base">Loading projects...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {repositories.map((repo) => (
                  <ProjectCard
                    key={repo.id}
                    title={repo.name}
                    description={repo.description || "No description available."}
                    url={repo.html_url}
                    githubUrl={repo.html_url}
                    isDeployed={false}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  );
};

export default ProjectsPage;