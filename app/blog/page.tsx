import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Blogposts | Matsimitsu",
  description: "Articles and insights on technology, development, and more by Matsimitsu.",
  openGraph: {
    title: "My Blogposts | Matsimitsu",
    description: "Articles and insights on technology, development, and more by Matsimitsu.",
    type: "website",
    locale: "en_US",
    url: "https://example.com/blog", // Replace with your actual domain
    siteName: "Matsimitsu",
  },
}

// Sample Data (replace with actual data fetching)
const blogPosts = [
  {
    id: "1",
    date: "AUGUST 04, 2024",
    title: "Blocking AI crawlers with Bunny.net edge rules",
    excerpt:
      "I noticed a larger CDN bill than normal, and the cause was AI Crawlers, so I blocked them with Bunny.net Edge Rules.",
    slug: "blocking-ai-crawlers",
  },
  {
    id: "2",
    date: "AUGUST 04, 2024",
    title: "Rust Enums in SQLite with Diesel",
    excerpt: "I keep forgetting how to use Rust Enums with Diesel, so I wrote it down for future self.",
    slug: "rust-enums-sqlite-diesel",
  },
  {
    id: "3",
    date: "JULY 28, 2024",
    title: "Render error pages in Axum",
    excerpt:
      "This post details how I use IntoResponse for my AppError to render proper error pages and status codes for all my Error types, including Diesel::error::NotFound.",
    slug: "render-error-pages-axum",
  },
  {
    id: "4",
    date: "JULY 15, 2024",
    title: "Getting Started with Next.js 15",
    excerpt: "A comprehensive guide to setting up your first project with the latest features in Next.js 15.",
    slug: "getting-started-nextjs-15",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200">My Blogposts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} passHref legacyBehavior>
            <a className="block group">
              <Card className="bg-slate-800 dark:bg-slate-900 text-white dark:text-slate-100 hover:bg-slate-700 dark:hover:bg-slate-800 transition-colors shadow-md h-full flex flex-col group-hover:shadow-lg">
                <CardHeader>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{post.date}</p>
                  <CardTitle className="text-lg group-hover:underline">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-slate-300 dark:text-slate-400">{post.excerpt}</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
