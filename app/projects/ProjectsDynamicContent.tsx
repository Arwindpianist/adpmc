"use client"

import { useCallback, useEffect, useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import { isFeaturedImpactDeployedTitle } from "@/lib/site-seo"
import { RefreshCw } from "lucide-react"

interface Repository {
  id: string
  displayName: string
  description: string
  updatedAt: string
}

interface DetectedProject {
  title: string
  description: string
  url: string
  detected: boolean
}

export default function ProjectsDynamicContent() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [detectedProjects, setDetectedProjects] = useState<DetectedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [detecting, setDetecting] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchRepositories = useCallback(async (currentDetectedProjects: DetectedProject[] = []) => {
    try {
      const response = await fetch("/api/get-repositories")
      const data = await response.json()

      if (data.success && data.repositories) {
        const allProjectNames = currentDetectedProjects.map((p) => p.title.toLowerCase())
        const filteredData = data.repositories.filter(
          (repo: { displayName: string }) => !allProjectNames.includes(repo.displayName.toLowerCase())
        )

        const sortedData = filteredData.sort(
          (a: { updatedAt: string }, b: { updatedAt: string }) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )

        setRepositories(sortedData)
        setLastRefresh(new Date())
      }
    } catch {
      // Error fetching repositories
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  const detectProjects = useCallback(async () => {
    setDetecting(true)
    try {
      const response = await fetch("/api/detect-projects")
      const data = await response.json()

      if (data.success && data.projects) {
        setDetectedProjects(data.projects)
        fetchRepositories(data.projects)
      }
    } catch {
      // Error detecting projects
    } finally {
      setDetecting(false)
    }
  }, [fetchRepositories])

  const handleManualRefresh = () => {
    setRefreshing(true)
    detectProjects()
  }

  useEffect(() => {
    detectProjects()
    fetchRepositories([])
  }, [detectProjects, fetchRepositories])

  useEffect(() => {
    const interval = setInterval(() => {
      detectProjects()
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [detectProjects])

  const allDeployedProjects = detectedProjects.map((project) => ({
    title: project.title,
    description: project.description,
    url: project.url,
    detected: true,
  }))

  const deployedProjectsFiltered = allDeployedProjects.filter((p) => !isFeaturedImpactDeployedTitle(p.title))

  return (
    <>
      <section className="py-16 sm:py-24 lg:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
              Deployed Projects {detecting && <span className="text-sm text-gray-400">(Detecting...)</span>}
            </h2>
            <div className="flex items-center gap-4">
              {lastRefresh && (
                <span className="text-sm text-gray-400">Last updated: {lastRefresh.toLocaleTimeString()}</span>
              )}
              <button
                type="button"
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
            {deployedProjectsFiltered.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                title={project.title}
                description={project.description}
                url={project.url}
                isDeployed={true}
              />
            ))}
            {deployedProjectsFiltered.length === 0 && !detecting && (
              <div className="col-span-full text-center text-gray-400 py-12">
                No deployed projects found. Projects are automatically synced from your Vercel account.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              GitHub Projects ({repositories.length} repositories)
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
              Unlock access to view all GitHub repository source code. Click on any project to purchase access.
            </p>
          </div>
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-teal-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {repositories.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  title={repo.displayName}
                  description={repo.description}
                  url="#"
                  projectId={repo.id}
                  isDeployed={false}
                  isGitHubRepo={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
