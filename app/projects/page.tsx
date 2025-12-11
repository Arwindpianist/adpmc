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

interface DetectedProject {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  detected: boolean;
}

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
      const allProjectNames = currentDetectedProjects.map(p => p.title.toLowerCase());
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

  // Convert detected projects to deployed projects format
  const allDeployedProjects = detectedProjects.map(project => ({
    title: project.title,
    description: project.description,
    url: project.url,
    githubUrl: project.githubUrl,
    detected: true
  }));

  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        {/* Featured Project: MyceliumLink */}
        <section className="pt-32 pb-16 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glassmorphism p-8 rounded-lg max-w-4xl mx-auto border-2 border-teal-400/50">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-teal-400">
                  Featured Product: MyceliumLink
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our latest innovation in network solutions and connectivity
                </p>
                <a
                  href="https://myceliumlink.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary bg-teal-500 hover:bg-teal-600"
                >
                  Explore MyceliumLink
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

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
                  className="flex items-center gap-2 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
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
                />
              ))}
              {allDeployedProjects.length === 0 && !detecting && (
                <div className="col-span-full text-center text-gray-400 py-12">
                  No deployed projects found. Projects are automatically detected from your Vercel account and deployed domains.
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