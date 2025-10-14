import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-mono text-lg font-bold text-primary-foreground">ST</span>
              </div>
              <span className="text-lg font-bold">SmartTools</span>
            </div>
            <p className="text-sm text-muted-foreground">Fast, free, and powerful online tools for everyday tasks.</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#calculators" className="hover:text-foreground">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/#converters" className="hover:text-foreground">
                  Converters
                </Link>
              </li>
              <li>
                <Link href="/#generators" className="hover:text-foreground">
                  Generators
                </Link>
              </li>
              <li>
                <Link href="/#text-tools" className="hover:text-foreground">
                  Text Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/favorites" className="hover:text-foreground">
                  My Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmartTools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
