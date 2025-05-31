import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Notes | Matsimitsu",
  description: "A collection of thoughts, ideas, and quick notes by Matsimitsu.",
  openGraph: {
    title: "My Notes | Matsimitsu",
    description: "A collection of thoughts, ideas, and quick notes by Matsimitsu.",
    type: "website",
    locale: "en_US",
    url: "https://example.com/notes", // Replace with your actual domain
    siteName: "Matsimitsu",
  },
}

// Sample Data (replace with actual data fetching)
const notes = [
  {
    id: "1",
    date: "MAY 05, 2025",
    title: "Bamboo scaffolding",
    excerpt:
      "Really well done interactive page about bamboo scaffolding in Hong Kong by scmp. Fascinating engineering.",
    slug: "bamboo-scaffolding",
  },
  {
    id: "2",
    date: "APRIL 20, 2025",
    title: "Thoughts on WebAssembly",
    excerpt:
      "Exploring the potential of WebAssembly for performance-critical web applications. Could be a game changer.",
    slug: "thoughts-on-webassembly",
  },
  {
    id: "3",
    date: "MARCH 10, 2025",
    title: "Favorite VS Code Extensions",
    excerpt:
      "A quick list of VS Code extensions that significantly boost my productivity. Includes Prettier, ESLint, and GitLens.",
    slug: "favorite-vscode-extensions",
  },
  {
    id: "4",
    date: "FEBRUARY 15, 2025",
    title: "Learning Rust: Day 30",
    excerpt: "Reflections on the first month of learning Rust. Steep learning curve but incredibly powerful.",
    slug: "learning-rust-day-30",
  },
]

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200">My Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link key={note.id} href={`/notes/${note.slug}`} passHref legacyBehavior>
            <a className="block group">
              <Card className="bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors shadow-md h-full flex flex-col group-hover:shadow-lg">
                <CardHeader>
                  <p className="text-xs text-amber-700 dark:text-amber-400">{note.date}</p>
                  <CardTitle className="text-lg text-amber-900 dark:text-amber-200 group-hover:underline">
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-amber-800 dark:text-amber-300">{note.excerpt}</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
