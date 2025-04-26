"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
);

const ProjectsPage = () => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Arwindpianist/repos"
        );
        const data = await response.json();

        // Filter out repositories with no description
        const filteredData = data.filter((repo: any) => repo.description);

        // Sort repositories by creation date (newest first)
        const sortedData = filteredData.sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
        <section className="py-40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Completed Projects</h2>
            {loading ? (
              <p className="text-center">Loading projects...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105"
                  >
                    <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
                    <p className="text-gray-400 mb-4">
                      {repo.description || "No description available."}
                    </p>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Deployed Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Deployed Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
                <a
                  href="https://askitchen.arwindpianist.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/askitchen-preview.png"
                    alt="AS Kitchen"
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">
                    AS Kitchen <span className="text-gray-400">(askitchen.arwindpianist.store)</span>
                  </h3>
                </a>
                <p className="text-gray-400">
                  A website showcasing AS Kitchen's services and menu.
                </p>
              </div>
              <div className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
                <a
                  href="https://pogopass.arwindpianist.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/pogopass-preview.png"
                    alt="PogoPass"
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">
                    PogoPass <span className="text-gray-400">(pogopass.arwindpianist.store)</span>
                  </h3>
                </a>
                <p className="text-gray-400">
                  Pogopass Password Manager official website.
                </p>
              </div>
              <div className="glassmorphism p-6 rounded-lg transition duration-300 hover:scale-105">
                <a
                  href="https://www.kmtcs.com.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/kmtcs-preview.png"
                    alt="KMTCS"
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">
                    KMTCS <span className="text-gray-400">(kmtcs.com.my)</span>
                  </h3>
                </a>
                <p className="text-gray-400">
                  Official website for KMTCS services and information.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default ProjectsPage;