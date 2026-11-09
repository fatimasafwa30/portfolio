import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import {
  personalInfo,
  educationData,
  engineeringPillars,
} from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-12 sm:py-16 border-b border-zinc-800/80"
    >
      <div data-assembly-block="about-heading">
        <SectionHeading id="about-heading" title="About" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Portrait Asset */}
        <div
          data-assembly-block="about-portrait"
          className="lg:col-span-5 w-full max-w-sm mx-auto lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-zinc-800 bg-[#121215]">
            <Image
              src="/headshot.png"
              alt="Fatima Safwa - Portrait"
              width={448}
              height={560}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 448px"
              className="object-cover w-full h-full grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <p className="font-mono text-xs text-zinc-400 text-center mt-3">
            Fatima Safwa · Bangalore, India
          </p>
        </div>

        {/* Right column: Narrative Bio, Education, Engineering Pillars */}
        <div className="lg:col-span-7 space-y-6">
          {/* Narrative paragraphs */}
          <div data-assembly-block="about-bio" className="space-y-4">
            {personalInfo.bioParagraphs.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="text-sm sm:text-base text-zinc-300 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Academic Foundation */}
          <div data-assembly-block="about-education" className="pt-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
              Academic Foundation
            </h3>
            <div className="bg-[#121215] border border-zinc-800 rounded-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                <h4 className="font-sans text-base sm:text-lg font-bold text-zinc-100">
                  {educationData.institution}
                </h4>
                <span className="font-mono text-xs text-zinc-400">
                  {educationData.period}
                </span>
              </div>
              <p className="font-mono text-xs text-[#ff3b2f] font-medium">
                {educationData.degree} — {educationData.field}
              </p>
              <p className="font-mono text-xs text-zinc-400 mt-1">
                {educationData.location}
              </p>
            </div>
          </div>

          {/* Core Engineering Focus Pillars */}
          <div data-assembly-block="about-pillars" className="pt-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
              Core Engineering Focus
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {engineeringPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-[#121215] border border-zinc-800/80 p-4 rounded-sm"
                >
                  <h4 className="font-sans text-sm font-semibold text-zinc-200">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

