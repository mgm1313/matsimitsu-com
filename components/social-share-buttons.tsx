"use client"

import { TwitterIcon, FacebookIcon, LinkedinIcon, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareButtonsProps {
  url: string
  title: string
}

export default function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-2 my-4">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Share:</span>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <TwitterIcon className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(url)} aria-label="Copy link">
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
