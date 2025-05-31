import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Trips | Matsimitsu",
  description: "A collection of travelogues and adventures by Matsimitsu.",
  openGraph: {
    title: "My Trips | Matsimitsu",
    description: "A collection of travelogues and adventures by Matsimitsu.",
    type: "website",
    locale: "en_US",
    url: "https://example.com/trips", // Replace with your actual domain
    siteName: "Matsimitsu",
  },
}

// Sample Data (replace with actual data fetching)
const trips = [
  {
    id: "1",
    title: "Amsterdam do Kunjing",
    date: "MAY 11, 2025 - JUNE 13, 2025",
    imageUrl: "/placeholder.svg?width=600&height=400",
    isFeatured: true,
    slug: "amsterdam-do-kunjing",
    description: "Exploring the canals and culture of Amsterdam and the unique landscapes of Kunjing.",
    smallImages: [
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
    ],
  },
  {
    id: "2",
    title: "China & Thailand 2025",
    date: "MAY 11, 2025 - JUNE 13, 2025",
    description:
      "It's time for another trip! This time I'll start with two weeks in China, exploring the \"west\" side of the country around Kunming, followed by an adventure in Thailand.",
    imageUrl: "/placeholder.svg?width=600&height=400",
    slug: "china-thailand-2025",
    smallImages: [
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
    ],
  },
  {
    id: "3",
    title: "Tunisia 2025",
    date: "MAY 11, 2025 - JUNE 13, 2025",
    description:
      'This time I\'ll start with two weeks in Tunisia, exploring the "north" side of the country, its history and deserts.',
    imageUrl: "/placeholder.svg?width=600&height=400",
    slug: "tunisia-2025",
    smallImages: [
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
      "/placeholder.svg?width=100&height=100",
    ],
  },
]

export default function TripsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200">My Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <Link key={trip.id} href={`/trips/${trip.slug}`} passHref legacyBehavior>
            <a className="block group">
              <Card className="overflow-hidden shadow-lg h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-56">
                  <Image
                    src={trip.imageUrl || "/placeholder.svg"}
                    alt={trip.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-xs text-slate-200">{trip.date}</p>
                    <h3 className="text-xl font-bold text-white group-hover:underline">{trip.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow">
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    {trip.description}
                  </CardDescription>
                  {trip.smallImages && trip.smallImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-auto">
                      {trip.smallImages.slice(0, 4).map((img, index) => (
                        <Image
                          key={index}
                          src={img || "/placeholder.svg"}
                          alt={`${trip.title} gallery image ${index + 1}`}
                          width={60}
                          height={60}
                          className="rounded-md object-cover aspect-square"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
