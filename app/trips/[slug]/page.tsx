import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarDaysIcon, MapPinIcon, ImageIcon } from "lucide-react"
import SocialShareButtons from "@/components/social-share-buttons"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Sample Data Fetching Function
async function getTrip(slug: string) {
  const trips = [
    {
      id: "1",
      slug: "amsterdam-do-kunjing",
      title: "Amsterdam & Kunjing Adventure",
      date: "MAY 11, 2025 - JUNE 13, 2025",
      location: "Amsterdam, Netherlands & Kunjing, Fictional",
      mainImage: "/amsterdam-canal-kunjing.png",
      excerpt:
        "An unforgettable journey through the charming canals of Amsterdam and the breathtaking landscapes of Kunjing.",
      galleryImages: [
        "/placeholder.svg?width=800&height=600",
        "/placeholder.svg?width=800&height=600",
        "/placeholder.svg?width=800&height=600",
        "/placeholder.svg?width=800&height=600",
        "/placeholder.svg?width=800&height=600",
      ],
      content: `
        <p>This trip was a tale of two vastly different, yet equally captivating destinations. We started in Amsterdam, the vibrant capital of the Netherlands, known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades.</p>
        <h2 class="text-2xl font-semibold my-4">Amsterdam Highlights:</h2>
        <ul class="list-disc list-inside space-y-1 my-2">
          <li>Canal cruise offering a unique perspective of the city.</li>
          <li>Visits to the Rijksmuseum and Van Gogh Museum.</li>
          <li>Exploring the Jordaan district with its quaint shops and cafes.</li>
          <li>A day trip to see the iconic windmills at Zaanse Schans.</li>
        </ul>
        <p>After a week soaking in Dutch culture, we flew to Kunjing, a hidden gem known for its stunning natural beauty and serene atmosphere. (Kunjing is fictional for this example).</p>
        <h2 class="text-2xl font-semibold my-4">Kunjing Discoveries:</h2>
        <ul class="list-disc list-inside space-y-1 my-2">
          <li>Hiking through the Whispering Pines Forest to reach the Crystal Peak.</li>
          <li>Meditating at the ancient Sunstone Temple.</li>
          <li>Learning traditional Kunjingese cooking from local villagers.</li>
          <li>Stargazing in the unpolluted night skies – truly breathtaking.</li>
        </ul>
        <p>The contrast between the bustling European city and the tranquil, almost mystical landscapes of Kunjing made this trip exceptionally memorable. Each place offered unique experiences that broadened our horizons.</p>
      `,
      tags: ["Europe", "Asia (Fictional)", "Adventure", "Culture", "City Break", "Nature"],
    },
    // Add other trips
  ]
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) return null
  await new Promise((resolve) => setTimeout(resolve, 180))
  return trip
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const trip = await getTrip(params.slug)
  if (!trip) {
    return { title: "Trip Not Found" }
  }
  return {
    title: `${trip.title} | Matsimitsu Trips`,
    description: trip.excerpt,
    openGraph: {
      title: trip.title,
      description: trip.excerpt,
      type: "article", // A trip log can be an article
      images: [
        {
          url: trip.mainImage || `https://example.com/og-image-trip.png`, // Replace
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
    },
  }
}

function generateTripJsonLd(trip: NonNullable<Awaited<ReturnType<typeof getTrip>>>) {
  // Could be 'Event' if it's a specific planned event, or 'Article' for a travelogue
  return {
    "@context": "https://schema.org",
    "@type": "Article", // Using Article for a travelogue style
    headline: trip.title,
    image: trip.mainImage,
    datePublished: trip.date.split(" - ")[0], // Approximate start date
    description: trip.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://example.com/trips/${trip.slug}`, // Replace with actual domain
    },
    // If it were an Event:
    // name: trip.title,
    // startDate: trip.date.split(" - ")[0],
    // endDate: trip.date.split(" - ")[1],
    // location: {
    //   '@type': 'Place',
    //   name: trip.location,
    // },
  }
}

export default async function TripPage({ params }: { params: { slug: string } }) {
  const trip = await getTrip(params.slug)

  if (!trip) {
    return <div className="container mx-auto px-4 md:px-6 py-8 text-center">Trip not found.</div>
  }

  const currentUrl = `https://example.com/trips/${trip.slug}` // Replace with actual domain

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateTripJsonLd(trip)) }}
      />
      <article className="container mx-auto max-w-4xl px-4 md:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-slate-100">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>{trip.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              <span>{trip.location}</span>
            </div>
          </div>
          {trip.mainImage && (
            <div className="mt-6 aspect-[16/9] relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={trip.mainImage || "/placeholder.svg"}
                alt={trip.title}
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
          dangerouslySetInnerHTML={{ __html: trip.content }}
        />

        {trip.galleryImages && trip.galleryImages.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ImageIcon className="h-6 w-6" />
              Photo Gallery
            </h2>
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {trip.galleryImages.map((imgSrc, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="aspect-square relative overflow-hidden rounded-md shadow-md">
                        <Image
                          src={imgSrc || "/placeholder.svg"}
                          alt={`${trip.title} gallery image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        )}

        <Separator className="my-8" />

        <footer className="space-y-6">
          {trip.tags && trip.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags:</h3>
              {trip.tags.map((tag) => (
                <Link key={tag} href={`/trips/tag/${tag.toLowerCase()}`} legacyBehavior>
                  <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          <SocialShareButtons url={currentUrl} title={trip.title} />
        </footer>
      </article>
    </>
  )
}
