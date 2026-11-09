import SectionHeading from "@/components/SectionHeading";
import { skillCategories } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-12 sm:py-16 border-b border-zinc-800/80"
    >
      <div data-assembly-block="skills-heading">
        <SectionHeading id="skills-heading" title="Technical Skills" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={category.name}
            data-assembly-block={`skills-card-${index}`}
            className="bg-[#121215] border border-zinc-800 rounded-sm p-5 sm:p-6 hover:border-zinc-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#ff3b2f] font-semibold mb-4 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#ff3b2f] shrink-0"
                  aria-hidden="true"
                />
                <span>{category.name}</span>
              </h3>

              <ul
                className="flex flex-wrap gap-1.5"
                aria-label={`${category.name} technologies`}
              >
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 border border-zinc-800 text-zinc-300 rounded-sm bg-zinc-950/60 hover:border-zinc-700 hover:text-white transition-colors"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

