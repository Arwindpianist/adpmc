"use client"

import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"

type TransitionLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    disableTransition?: boolean
  }

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => { finished: Promise<void> }
}

const isModifiedEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0

const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, target, disableTransition = false, ...props }, ref) => {
    const router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)

      const transitionDocument = document as ViewTransitionDocument

      if (
        event.defaultPrevented ||
        disableTransition ||
        typeof href !== "string" ||
        !href.startsWith("/") ||
        target ||
        isModifiedEvent(event) ||
        !transitionDocument.startViewTransition
      ) {
        return
      }

      event.preventDefault()
      transitionDocument.startViewTransition(() => {
        router.push(href)
      })
    }

    return <Link ref={ref} href={href} target={target} onClick={handleClick} {...props} />
  }
)

TransitionLink.displayName = "TransitionLink"

export default TransitionLink
