import SectionHeading from "@/components/SectionHeading";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-12 sm:py-16"
    >
      <div data-assembly-block="contact-heading">
        <SectionHeading id="contact-heading" title="Let's Connect." />
      </div>

      <div className="max-w-3xl space-y-8">
        <p
          data-assembly-block="contact-narrative"
          className="text-base sm:text-lg text-zinc-300 leading-relaxed"
        >
          I am currently open to software development, full-stack engineering,
          and applied AI opportunities. Whether you have an open position, a project
          collaboration in mind, or questions about my engineering work, feel free
          to reach out directly.
        </p>

        {/* Primary Contact Option: Email */}
        <div
          data-assembly-block="contact-email"
          className="bg-[#121215] border border-zinc-800 rounded-sm p-6 sm:p-8 space-y-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff3b2f] font-semibold">
            Direct Email
          </span>
          <div>
            <a
              href="mailto:fatimasafwa30@gmail.com"
              className="font-mono text-lg sm:text-2xl text-zinc-100 hover:text-white transition-colors underline decoration-zinc-700 hover:decoration-[#ff3b2f] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#ff3b2f] break-all font-medium inline-block"
              aria-label="Send email to fatimasafwa30@gmail.com (opens email client)"
            >
              fatimasafwa30@gmail.com
            </a>
          </div>
          <p className="font-mono text-xs text-zinc-400">
            Click to open your default email client.
          </p>
        </div>

        {/* Channels & Verification Links */}
        <div data-assembly-block="contact-links">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4">
            Profiles & Verification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://github.com/fatimasafwa30"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-3.5 bg-[#121215] border border-zinc-800 hover:border-zinc-600 rounded-sm inline-flex items-center justify-between group transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
              aria-label="Fatima Safwa's GitHub Profile (opens in a new tab)"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 group-hover:text-white transition-colors font-semibold">
                GitHub
              </span>
              <span
                className="text-zinc-500 group-hover:text-[#ff3b2f] transition-colors"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <a
              href="https://linkedin.com/in/fatima-safwa-08097b33b"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-3.5 bg-[#121215] border border-zinc-800 hover:border-zinc-600 rounded-sm inline-flex items-center justify-between group transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
              aria-label="Fatima Safwa's LinkedIn Profile (opens in a new tab)"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 group-hover:text-white transition-colors font-semibold">
                LinkedIn
              </span>
              <span
                className="text-zinc-500 group-hover:text-[#ff3b2f] transition-colors"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-3.5 bg-[#121215] border border-zinc-800 hover:border-zinc-600 rounded-sm inline-flex items-center justify-between group transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
              aria-label="Download Fatima Safwa's Resume as PDF (opens in a new tab)"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 group-hover:text-white transition-colors font-semibold">
                Resume (PDF)
              </span>
              <span
                className="text-zinc-500 group-hover:text-[#ff3b2f] transition-colors"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
