import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Matsimitsu - Personal Blog",
  description: "A personal blog by Matsimitsu, featuring travel, tech, and notes.",
  openGraph: {
    title: "Matsimitsu - Personal Blog",
    description: "A personal blog by Matsimitsu, featuring travel, tech, and notes.",
    type: "website",
    locale: "en_US",
    url: "https://example.com", // Replace with your actual domain
    siteName: "Matsimitsu",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
