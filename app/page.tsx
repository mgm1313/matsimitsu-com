import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Sample Data (replace with actual data fetching)
const trips = [
  {
    id: "1",
    title: "Amsterdam do Kunjing",
    date: "MAY 11, 2025 - JUNE 13, 2025",
    imageUrl: "/placeholder.svg?width=600&height=400",
    isFeatured: true,
    slug: "amsterdam-do-kunjing",
  },
  {
    id: "2",
    title: "China & Thailand 2025",
    date: "MAY 11, 2025 - JUNE 13, 2025",
    description:
      "It's time for another trip! This time I'll start with two weeks in China, exploring the \"west\" side of the country around Kunming.",
    smallImages: [
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
    ],
    slug: "china-thailand-2025",
  },
  {
    id: "3",
    title: "Tunisia 2025",
    date: "MAY 11, 2025 - JUNE 13, 2025",
    description: 'This time I\'ll start with two weeks in Tunisia, exploring the "north" side of the country.',
    smallImages: [
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
    ],
    slug: "tunisia-2025",
  },
]

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
    date: "AUGUST 04, 2024",
    title: "Render error pages in Axum",
    excerpt:
      "This post details how I use IntoResponse for my AppError to render proper error pages and status codes for all my Error types, including Diesel::error::NotFound.",
    slug: "render-error-pages-axum",
  },
  {
    id: "4",
    date: "AUGUST 04, 2024",
    title: "Render error pages in Axum", // Duplicate title from image
    excerpt:
      "This post details how I use IntoResponse for my AppError to render proper error pages and status codes for all my Error types, including Diesel::error::NotFound.",
    slug: "render-error-pages-axum-2",
  },
]

const notes = [
  {
    id: "1",
    date: "MAY 05, 2025",
    title: "Bamboo scaffolding",
    excerpt: "Really well done interactive page about bamboo scaffolding in Hong Kong by scmp.",
    slug: "bamboo-scaffolding",
  },
  {
    id: "2",
    date: "MAY 05, 2025",
    title: "Bamboo scaffolding",
    excerpt: "Really well done interactive page about bamboo scaffolding in Hong Kong by scmp.",
    slug: "bamboo-scaffolding-2",
  },
  {
    id: "3",
    date: "MAY 05, 2025",
    title: "Bamboo scaffolding",
    excerpt: "Really well done interactive page about bamboo scaffolding in Hong Kong by scmp.",
    slug: "bamboo-scaffolding-3",
  },
]

export default function HomePage() {
  const featuredTrip = trips.find((trip) => trip.isFeatured)
  const otherTrips = trips.filter((trip) => !trip.isFeatured)

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trips Section */}
        <section className="space-y-6">
          <Link
            href="/trips"
            className="group flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-slate-50"
            prefetch={false}
          >
            My trips <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          {featuredTrip && (
            <Link href={`/trips/${featuredTrip.slug}`} className="block group">
              <Card className="overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                <div className="relative h-64">
                  <Image
                    src={featuredTrip.imageUrl || "/placeholder.svg"}
                    alt={featuredTrip.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-xs text-slate-200">{featuredTrip.date}</p>
                    <h3 className="text-2xl font-bold text-white group-hover:underline">{featuredTrip.title}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          )}
          {otherTrips.map((trip) => (
            <Link key={trip.id} href={`/trips/${trip.slug}`} className="block group">
              <Card className="shadow-md transition-shadow duration-300 group-hover:shadow-lg">
                <CardHeader>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{trip.date}</p>
                  <CardTitle className="text-lg text-slate-800 dark:text-slate-200 group-hover:underline">
                    {trip.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
                    {trip.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {trip.smallImages?.map((img, index) => (
                      <Image
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`${trip.title} image ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        {/* Blogposts Section */}
        <section className="space-y-6">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-slate-50"
            prefetch={false}
          >
            My blogposts <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} passHref legacyBehavior>
              <a className="block">
                <Card className="bg-slate-800 dark:bg-slate-900 text-white dark:text-slate-100 hover:bg-slate-700 dark:hover:bg-slate-800 transition-colors shadow-md">
                  <CardHeader>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{post.date}</p>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 dark:text-slate-400">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </section>

        {/* Notes Section */}
        <section className="space-y-6">
          <Link
            href="/notes"
            className="group flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-slate-50"
            prefetch={false}
          >
            My notes <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.slug}`} passHref legacyBehavior>
              <a className="block">
                <Card className="bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors shadow-md">
                  <CardHeader>
                    <p className="text-xs text-amber-700 dark:text-amber-400">{note.date}</p>
                    <CardTitle className="text-lg text-amber-900 dark:text-amber-200">{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-800 dark:text-amber-300">{note.excerpt}</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}
