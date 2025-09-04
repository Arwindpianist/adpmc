"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

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
}

// Define deployed projects including the new ones
const deployedProjects: DeployedProject[] = [
  {
    title: "AS Kitchen",
    description: "A website showcasing AS Kitchen's services and menu.",
    url: "https://askitchen.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/askitchen"
  },
  {
    title: "PogoPass",
    description: "Pogopass Password Manager official website.",
    url: "https://pogopass.arwindpianist.store/",
    githubUrl: "https://github.com/Arwindpianist/pogopass"
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Arwindpianist/repos?per_page=100&sort=updated"
        );
        const data = await response.json();

        // Filter out deployed projects and forks, but include all repositories
        const deployedProjectNames = deployedProjects.map(p => p.title.toLowerCase());
        const filteredData = data.filter((repo: Repository) => 
          !deployedProjectNames.includes(repo.name.toLowerCase()) &&
          !repo.fork // Exclude forked repositories
        );

        // Sort repositories by update date (newest first)
        const sortedData = filteredData.sort(
          (a: Repository, b: Repository) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        setRepositories(sortedData);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

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
        <section className="py-40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Deployed Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deployedProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  url={project.url}
                  githubUrl={project.githubUrl}
                  isDeployed={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              GitHub Projects ({repositories.length} repositories)
            </h2>
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
                <p>Loading projects...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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