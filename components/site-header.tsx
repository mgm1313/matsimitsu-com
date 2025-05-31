import Link from "next/link"
import { MountainIcon, PlaneIcon, NotebookTextIcon, PenToolIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function SiteHeader() {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-slate-800 dark:text-slate-200" />
          <span className="font-semibold text-lg text-slate-800 dark:text-slate-200">Matsimitsu</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/trips"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            prefetch={false}
          >
            <PlaneIcon className="h-4 w-4" />
            Trips
          </Link>
          <Link
            href="/notes"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            prefetch={false}
          >
            <NotebookTextIcon className="h-4 w-4" />
            Notes
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            prefetch={false}
          >
            <PenToolIcon className="h-4 w-4" />
            Blog
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <MountainIcon className="h-5 w-5" />
                Matsimitsu
              </Link>
              <nav className="grid gap-2">
                <Link href="/trips" className="flex items-center gap-2 text-sm" prefetch={false}>
                  <PlaneIcon className="h-4 w-4" />
                  Trips
                </Link>
                <Link href="/notes" className="flex items-center gap-2 text-sm" prefetch={false}>
                  <NotebookTextIcon className="h-4 w-4" />
                  Notes
                </Link>
                <Link href="/blog" className="flex items-center gap-2 text-sm" prefetch={false}>
                  <PenToolIcon className="h-4 w-4" />
                  Blog
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
