interface FooterLink {
  readonly platform: string;
  readonly url: string;
  readonly label: string;
  readonly display?: string;
  readonly isExternal: boolean;
}

const connectLinks: readonly FooterLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/fatimasafwa30",
    label: "GitHub profile of Fatima Safwa (opens in a new tab)",
    display: "GitHub",
    isExternal: true,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/fatima-safwa-08097b33b",
    label: "LinkedIn profile of Fatima Safwa (opens in a new tab)",
    display: "LinkedIn",
    isExternal: true,
  },
  {
    platform: "Email",
    url: "mailto:fatimasafwa30@gmail.com",
    label: "Send email to fatimasafwa30@gmail.com",
    display: "fatimasafwa30@gmail.com",
    isExternal: false,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090b] text-zinc-400 py-12 sm:py-16 mt-auto">
      <div data-assembly-block="footer-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Narrative */}
          <div className="md:col-span-7 space-y-3">
            <a
              href="#hero"
              className="inline-block font-display uppercase text-2xl sm:text-3xl tracking-wider text-zinc-100 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
              aria-label="Fatima Safwa - Return to top"
            >
              FATIMA SAFWA
              <span className="text-[#ff3b2f]" aria-hidden="true">
                .
              </span>
            </a>
            <p className="font-mono text-xs sm:text-sm text-[#ff3b2f] font-medium">
              Software Developer | Full-Stack & AI
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Designing reliable full-stack applications, resilient backend
              architectures, and practical applied AI systems.
            </p>
          </div>

          {/* Connect / Social Links */}
          <div className="md:col-span-5 md:flex md:flex-col md:items-end">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
                Connect
              </h3>
              <ul className="space-y-2.5">
                {connectLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      {...(link.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={link.label}
                      className="min-h-[44px] sm:min-h-0 inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-[#ff3b2f] transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
                    >
                      <span>{link.display ?? link.platform}</span>
                      {link.isExternal && (
                        <span aria-hidden="true" className="text-zinc-500">
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-zinc-500">
            © {currentYear} Fatima Safwa. All rights reserved.
          </p>

          <a
            href="#hero"
            className="min-h-[44px] sm:min-h-0 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

