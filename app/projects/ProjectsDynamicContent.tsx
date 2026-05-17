"use client"

import { useCallback, useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"

import ProjectCard from "@/components/ProjectCard"
import { SectionIntro } from "@/components/site/section-intro"
import { Button } from "@/components/ui/button"
import { isFeaturedImpactDeployedTitle } from "@/lib/site-seo"

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
        const allProjectNames = currentDetectedProjects.map((project) => project.title.toLowerCase())
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
      // Leave state as-is and surface the empty state below.
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
      // Keep the previously rendered state.
    } finally {
      setDetecting(false)
    }
  }, [fetchRepositories])

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

  const handleManualRefresh = () => {
    setRefreshing(true)
    detectProjects()
  }

  const deployedProjectsFiltered = detectedProjects
    .map((project) => ({
      title: project.title,
      description: project.description,
      url: project.url,
      detected: true,
    }))
    .filter((project) => !isFeaturedImpactDeployedTitle(project.title))

  return (
    <>
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow="Detected live deployments"
              title="Projects currently live in production."
              description="These endpoints are detected dynamically so Case Studies in Infrastructure stay current without manual copy edits."
            />
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {lastRefresh ? (
                <p className="text-sm text-zinc-500">Last updated {lastRefresh.toLocaleTimeString()}</p>
              ) : null}
              <Button
                type="button"
                variant="secondary"
                onClick={handleManualRefresh}
                disabled={refreshing || detecting}
              >
                <RefreshCw className={`h-4 w-4 ${(refreshing || detecting) ? "animate-spin" : ""}`} />
                {detecting ? "Refreshing" : "Refresh"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {deployedProjectsFiltered.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                title={project.title}
                description={project.description}
                url={project.url}
                isDeployed
              />
            ))}
            {deployedProjectsFiltered.length === 0 && !detecting ? (
              <div className="surface-card-soft col-span-full rounded-[2rem] p-8 text-center text-zinc-400">
                No deployed projects found right now. Live deployments will appear automatically when available.
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <SectionIntro
            eyebrow="Repository access"
            title={`Source repositories (${repositories.length})`}
            description="Repository viewing is gated through a secure checkout flow, so you can browse implementation work without exposing URLs directly in the UI."
          />
          {loading ? (
            <div className="surface-card-soft rounded-[2rem] p-10 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <p className="mt-4 text-sm text-zinc-400">Loading repositories...</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {repositories.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  title={repo.displayName}
                  description={repo.description}
                  url="#"
                  projectId={repo.id}
                  isGitHubRepo
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
