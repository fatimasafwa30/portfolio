import SectionHeading from "@/components/SectionHeading";
import { experienceData } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-12 sm:py-16 border-b border-zinc-800/80"
    >
      <div data-assembly-block="experience-heading">
        <SectionHeading id="experience-heading" title="Experience" />
      </div>

      <div className="space-y-8">
        {experienceData.map((item) => (
          <article
            key={item.id}
            data-assembly-block={`experience-card-${item.id}`}
            className="bg-[#121215] border border-zinc-800 rounded-sm p-6 sm:p-8 hover:border-zinc-700 transition-colors"
          >
            {/* Header: Role, Organization, Period */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 pb-5 border-b border-zinc-800/80">
              <div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  {item.role}
                </h3>
                <p className="font-mono text-sm text-[#ff3b2f] mt-1 font-medium">
                  {item.organization}
                </p>
              </div>
              <div className="font-mono text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-sm self-start sm:self-auto">
                <time dateTime="2026">{item.period}</time>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {item.description}
            </p>

            {/* Responsibilities list */}
            <div className="mt-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                Key Contributions & Responsibilities
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-zinc-300">
                {item.responsibilities.map((resp) => (
                  <li key={resp} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-[#ff3b2f] shrink-0 select-none"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2.5">
                Technologies Used
              </h4>
              <ul
                className="flex flex-wrap gap-1.5"
                aria-label={`Technologies used at ${item.organization}`}
              >
                {item.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 border border-zinc-800 text-zinc-300 rounded-sm bg-zinc-950/60"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
