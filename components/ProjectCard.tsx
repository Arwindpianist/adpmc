"use client"

import { useEffect, useMemo, useState } from "react"
import { Code2, ExternalLink, Globe2, LockKeyhole } from "lucide-react"

import PaymentModal from "@/components/PaymentModal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPaymentStatus } from "@/lib/payment"

interface ProjectCardProps {
  title: string
  description: string
  url: string
  projectId?: string
  isDeployed?: boolean
  isGitHubRepo?: boolean
}

export default function ProjectCard({
  title,
  description,
  url,
  projectId,
  isDeployed = false,
  isGitHubRepo = false,
}: ProjectCardProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loadingUrl, setLoadingUrl] = useState(false)

  const projectIdRef = useMemo(() => ({ current: projectId }), [projectId])

  useEffect(() => {
    const syncAccess = () => setHasAccess(getPaymentStatus())

    syncAccess()
    window.addEventListener("storage", syncAccess)
    window.addEventListener("focus", syncAccess)

    return () => {
      window.removeEventListener("storage", syncAccess)
      window.removeEventListener("focus", syncAccess)
    }
  }, [])

  const handleUnlockClick = async () => {
    if (!hasAccess) {
      setShowPaymentModal(true)
      return
    }

    const currentProjectId = projectIdRef.current

    if (!currentProjectId || !isGitHubRepo) {
      return
    }

    setLoadingUrl(true)

    try {
      const response = await fetch("/api/get-github-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: currentProjectId }),
      })

      const data = await response.json()

      if (data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer")
      } else {
        alert("Unable to access repository. Please try again.")
      }
    } catch {
      alert("An error occurred. Please try again.")
    } finally {
      setLoadingUrl(false)
    }
  }

  const handleModalClose = () => {
    setShowPaymentModal(false)
    setHasAccess(getPaymentStatus())
  }

  const getDomain = (value: string) => {
    try {
      return new URL(value).hostname.replace("www.", "")
    } catch {
      return value
    }
  }

  return (
    <article className="surface-card-soft flex h-full flex-col rounded-[2rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white">
          {isDeployed ? <Globe2 className="h-5 w-5" /> : <Code2 className="h-5 w-5" />}
        </div>
        {isDeployed ? (
          <Badge variant="success" className="normal-case tracking-[0.08em]">
            Live
          </Badge>
        ) : (
          <Badge variant="secondary" className="normal-case tracking-[0.08em]">
            Repository
          </Badge>
        )}
      </div>

      <div className="mt-7 space-y-3">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-heading">{title}</h3>
        {isDeployed ? <p className="text-sm text-zinc-500">{getDomain(url)}</p> : null}
        <p className="text-sm leading-7 text-zinc-400">{description}</p>
      </div>

      <div className="mt-auto pt-8">
        {isDeployed ? (
          <Button asChild variant="secondary" className="w-full justify-between">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Visit site
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleUnlockClick}
            disabled={loadingUrl}
            className="w-full justify-between"
          >
            {loadingUrl ? "Loading..." : hasAccess ? "View code" : "Unlock code"}
            {hasAccess ? <Code2 className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <PaymentModal isOpen={showPaymentModal} onClose={handleModalClose} />
    </article>
  )
}
