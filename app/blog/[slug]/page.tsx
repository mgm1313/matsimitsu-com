import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarDaysIcon, UserIcon } from "lucide-react"
import SocialShareButtons from "@/components/social-share-buttons"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample Data Fetching Function (replace with actual data fetching)
async function getBlogPost(slug: string) {
  // In a real app, you'd fetch this from a CMS or database
  const posts = [
    {
      id: "1",
      slug: "blocking-ai-crawlers",
      title: "Blocking AI crawlers with Bunny.net edge rules",
      date: "2024-08-04",
      author: "Matsimitsu",
      featuredImage: "/ai-crawlers.png",
      excerpt:
        "I noticed a larger CDN bill than normal, and the cause was AI Crawlers, so I blocked them with Bunny.net Edge Rules.",
      content: `
        <p>The rise of AI crawlers has become a significant factor for website owners, often leading to increased bandwidth usage and server load. In this post, I'll detail my experience with an unexpected surge in my CDN bill and how I addressed it using Bunny.net's edge rules.</p>
        <h2 class="text-2xl font-semibold my-4">Identifying the Issue</h2>
        <p>My first clue was a CDN bill that was nearly double the usual amount. After digging into the analytics provided by Bunny.net, I noticed a pattern: a large number of requests were coming from IP ranges associated with common AI web crawlers. These crawlers, while sometimes beneficial for search engines, can be overly aggressive and consume vast amounts of data.</p>
        <figure class="my-6">
          <img src="/cdn-analytics-graph.png" alt="CDN Analytics Graph" class="rounded-lg shadow-md mx-auto" />
          <figcaption class="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">Sample graph showing increased traffic.</figcaption>
        </figure>
        <h2 class="text-2xl font-semibold my-4">Implementing Edge Rules</h2>
        <p>Bunny.net provides a powerful feature called Edge Rules, which allows you to define custom logic that runs at their edge servers. I decided to use this to block known AI crawler user agents.</p>
        <p>Here's a simplified version of the rule I implemented:</p>
        <pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md my-4 overflow-x-auto"><code class="language-json">
{
  "Action": {
    "Type": "BlockRequest"
  },
  "Triggers": [
    {
      "Type": "RequestHeader",
      "HeaderName": "User-Agent",
      "Pattern": "(Google-Extended|GPTBot|anthropic-ai|ClaudeBot)",
      "PatternMatchingType": "Regex"
    }
  ],
  "Description": "Block common AI crawlers"
}
        </code></pre>
        <p>This rule checks the <code>User-Agent</code> header of incoming requests. If it matches any of the specified patterns (e.g., GPTBot, ClaudeBot), the request is blocked before it hits my origin server or consumes significant CDN bandwidth.</p>
        <h2 class="text-2xl font-semibold my-4">Results and Considerations</h2>
        <p>After implementing this rule, I saw an immediate drop in bandwidth consumption, and my next CDN bill was back to normal. While blocking crawlers can have SEO implications if not done carefully (e.g., blocking Googlebot), targeting specific, non-essential AI crawlers proved effective in my case.</p>
        <p>It's crucial to regularly review and update these rules as new crawlers emerge or if you find legitimate services being inadvertently blocked.</p>
      `,
      categories: ["Tech", "Web Performance", "CDN"],
      tags: ["AI", "Bunny.net", "Edge Rules", "Optimization"],
    },
    {
      id: "2",
      slug: "rust-enums-sqlite-diesel",
      title: "Rust Enums in SQLite with Diesel",
      date: "2024-08-04",
      author: "Matsimitsu",
      featuredImage: "/rust-sqlite-diesel-logo.png",
      excerpt: "I keep forgetting how to use Rust Enums with Diesel, so I wrote it down for future self.",
      content:
        "<p>Working with Rust, SQLite, and Diesel ORM is generally a pleasant experience. However, mapping Rust enums to database columns can sometimes be tricky. This post serves as a quick guide and a note-to-self on how to handle this effectively.</p><p>SQLite doesn't have a native ENUM type like PostgreSQL or MySQL. Typically, you'd store enums as strings or integers. I prefer strings for readability in the database, though integers can be more performant.</p><p>Let's say we have a Rust enum:</p><pre class='bg-slate-100 dark:bg-slate-800 p-4 rounded-md my-4 overflow-x-auto'><code>pub enum Status {\n  Pending,\n  InProgress,\n  Completed,\n  Failed,\n}</code></pre><p>To use this with Diesel and SQLite, you'll need to implement `ToSql` and `FromSql` traits...</p><p>(Full implementation details would follow here)</p>",
      categories: ["Programming", "Rust", "Databases"],
      tags: ["Diesel", "SQLite", "Enums", "Rustlang"],
    },
    // Add other posts here
  ]
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    // Handle not found, perhaps redirect or show a 404 page
    return null
  }
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  return post
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  return {
    title: `${post.title} | Matsimitsu Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage || `https://example.com/og-image.png`, // Replace with actual domain
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || `https://example.com/twitter-image.png`], // Replace
    },
  }
}

// For structured data
function generatePostJsonLd(post: NonNullable<Awaited<ReturnType<typeof getBlogPost>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.featuredImage,
    datePublished: post.date,
    dateModified: post.date, // Assuming same for simplicity
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Matsimitsu Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/logo.png", // Replace with your logo
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://example.com/blog/${post.slug}`, // Replace with actual domain
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return <div className="container mx-auto px-4 md:px-6 py-8 text-center">Post not found.</div>
  }

  const currentUrl = `https://example.com/blog/${post.slug}` // Replace with actual domain

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePostJsonLd(post)) }}
      />
      <article className="container mx-auto max-w-3xl px-4 md:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-100">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              <span>By {post.author}</span>
            </div>
          </div>
          {post.featuredImage && (
            <div className="mt-6 aspect-video relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-slate dark:prose-invert max-w-none 
                     prose-headings:font-semibold prose-a:text-sky-600 dark:prose-a:text-sky-400 hover:prose-a:underline
                     prose-img:rounded-md prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-8" />

        <footer className="space-y-6">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Categories:</h3>
              {post.categories.map((category) => (
                <Link key={category} href={`/blog/category/${category.toLowerCase()}`} legacyBehavior>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags:</h3>
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`} legacyBehavior>
                  <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          <SocialShareButtons url={currentUrl} title={post.title} />

          {/* Placeholder for Comments Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Comments</h2>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center text-slate-500 dark:text-slate-400">
              <p>Comments section coming soon!</p>
              <p className="text-xs mt-1">
                Integrate your favorite commenting system here (e.g., Disqus, Commento, Giscus).
              </p>
            </div>
          </div>
        </footer>
      </article>
    </>
  )
}
