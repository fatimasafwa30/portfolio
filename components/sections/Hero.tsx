import { personalInfo } from "@/data/portfolio";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="py-16 sm:py-24 lg:py-28 border-b border-zinc-800/80"
    >
      {/* Availability Status Badge */}
      <div
        data-assembly-block="hero-status"
        className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-[#121215] mb-6 sm:mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3b2f] opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3b2f]" />
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-medium">
          {personalInfo.status}
        </span>
      </div>

      {/* Primary Display H1 Heading */}
      <h1
        id="hero-title"
        data-assembly-block="hero-title"
        className="font-display uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight text-zinc-100 leading-none"
      >
        {personalInfo.name}
      </h1>

      {/* Role / Focus & Summary Narrative */}
      <div data-assembly-block="hero-role">
        <p className="font-mono text-sm sm:text-base text-[#ff3b2f] mt-4 sm:mt-5 font-semibold tracking-wide">
          {personalInfo.role}
        </p>
        <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed">
          {personalInfo.summary}
        </p>
        <p className="font-hand text-lg sm:text-xl text-zinc-400 mt-4 select-none">
          {personalInfo.decorativeNote}
        </p>
      </div>

      {/* Primary Action Links */}
      <div
        data-assembly-block="hero-actions"
        className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
      >
        <a
          href={personalInfo.primaryAction.href}
          className="w-full sm:w-auto text-center min-h-[44px] min-w-[44px] px-6 py-3 inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest text-zinc-950 bg-zinc-100 font-bold hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2 rounded-sm"
        >
          {personalInfo.primaryAction.label}
        </a>
        <a
          href={personalInfo.secondaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center min-h-[44px] min-w-[44px] px-6 py-3 inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest text-zinc-100 bg-[#121215] border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2 rounded-sm"
          aria-label="Download Fatima Safwa's Resume as PDF (opens in a new tab)"
        >
          {personalInfo.secondaryAction.label}
        </a>
      </div>
    </section>
  );
}

