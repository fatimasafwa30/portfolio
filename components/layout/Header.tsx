import MobileNav from "@/components/layout/MobileNav";

interface NavLink {
  readonly label: string;
  readonly href: string;
}

const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <>
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ff3b2f] focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
      >
        Skip to main content
      </a>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Mark / Monogram */}
          <a
            href="#hero"
            data-assembly-block="header-brand"
            className="font-display text-2xl tracking-wider text-zinc-100 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2 flex items-center gap-0.5"
            aria-label="Fatima Safwa - Return to top"
          >
            <span>FS</span>
            <span className="text-[#ff3b2f]" aria-hidden="true">
              .
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            data-assembly-block="header-nav"
            className="hidden md:flex items-center gap-4 lg:gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2 py-1"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-sm border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:border-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2"
              aria-label="Download Fatima Safwa's Resume as PDF (opens in a new tab)"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>
    </>
  );
}

