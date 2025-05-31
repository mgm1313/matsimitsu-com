import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDaysIcon } from "lucide-react"
import SocialShareButtons from "@/components/social-share-buttons"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample Data Fetching Function
async function getNote(slug: string) {
  const notes = [
    {
      id: "1",
      slug: "bamboo-scaffolding",
      title: "Bamboo Scaffolding Insights",
      date: "2025-05-05",
      content: `
        <p>The SCMP interactive page on bamboo scaffolding in Hong Kong is a masterpiece of digital storytelling. It beautifully illustrates the intricate art and engineering behind these traditional structures.</p>
        <h3 class="text-xl font-semibold my-3">Key Takeaways:</h3>
        <ul class="list-disc list-inside space-y-1 my-2">
          <li><strong>Sustainability:</strong> Bamboo is a highly renewable resource.</li>
          <li><strong>Flexibility:</strong> Adapts to complex building shapes where steel scaffolding might be cumbersome.</li>
          <li><strong>Skill:</strong> Requires highly skilled workers, a craft passed down through generations.</li>
          <li><strong>Strength:</strong> Despite its light weight, bamboo has incredible tensile strength.</li>
        </ul>
        <p>The article highlights how this ancient technique coexists with modern skyscrapers, a testament to its enduring utility. It also touches upon the challenges, such as the declining number of skilled practitioners.</p>
        <figure class="my-6">
          <img src="/bamboo-scaffolding-diagram.png" alt="Bamboo Scaffolding Diagram" class="rounded-lg shadow-md mx-auto" />
          <figcaption class="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">Conceptual diagram of bamboo connections.</figcaption>
        </figure>
        <p>A fascinating read for anyone interested in architecture, engineering, or cultural heritage.</p>
      `,
      tags: ["Engineering", "Culture", "Hong Kong", "Architecture"],
      excerpt: "Deep dive into the SCMP interactive page about bamboo scaffolding in Hong Kong.",
    },
    // Add other notes
  ]
  const note = notes.find((n) => n.slug === slug)
  if (!note) return null
  await new Promise((resolve) => setTimeout(resolve, 150))
  return note
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const note = await getNote(params.slug)
  if (!note) {
    return { title: "Note Not Found" }
  }
  return {
    title: `${note.title} | Matsimitsu Notes`,
    description: note.excerpt,
    openGraph: {
      title: note.title,
      description: note.excerpt,
      type: "article", // Notes can be considered articles
      publishedTime: note.date,
    },
  }
}

function generateNoteJsonLd(note: NonNullable<Awaited<ReturnType<typeof getNote>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "NoteDigitalDocument", // Or 'Article' if more appropriate
    headline: note.title,
    datePublished: note.date,
    description: note.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://example.com/notes/${note.slug}`, // Replace with actual domain
    },
  }
}

export default async function NotePage({ params }: { params: { slug: string } }) {
  const note = await getNote(params.slug)

  if (!note) {
    return <div className="container mx-auto px-4 md:px-6 py-8 text-center">Note not found.</div>
  }

  const currentUrl = `https://example.com/notes/${note.slug}` // Replace with actual domain

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateNoteJsonLd(note)) }}
      />
      <article className="container mx-auto max-w-3xl px-4 md:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-amber-900 dark:text-amber-200">{note.title}</h1>
          <div className="flex items-center gap-1 text-sm text-amber-700 dark:text-amber-400">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>
              {new Date(note.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </header>

        <div
          className="prose prose-amber dark:prose-invert max-w-none 
                     prose-headings:font-semibold prose-a:text-sky-600 dark:prose-a:text-sky-400 hover:prose-a:underline
                     prose-img:rounded-md prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        <Separator className="my-8 border-amber-200 dark:border-amber-800" />

        <footer className="space-y-6">
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Tags:</h3>
              {note.tags.map((tag) => (
                <Link key={tag} href={`/notes/tag/${tag.toLowerCase()}`} legacyBehavior>
                  <Badge
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-100 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-800 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          <SocialShareButtons url={currentUrl} title={note.title} />
        </footer>
      </article>
    </>
  )
}
