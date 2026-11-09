import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { individualProjects, groupProjects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-12 sm:py-16 border-b border-zinc-800/80"
    >
      <div data-assembly-block="projects-heading">
        <SectionHeading id="projects-heading" title="Projects" />
      </div>

      <div className="space-y-12 sm:space-y-16">
        {/* Subgroup: Individual Projects */}
        <div data-assembly-block="projects-individual">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-zinc-200">
              Individual Projects
            </h3>
            <span className="font-mono text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-sm">
              {individualProjects.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {individualProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Subgroup: Group Projects */}
        <div data-assembly-block="projects-group">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-zinc-200">
              Group Projects
            </h3>
            <span className="font-mono text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-sm">
              {groupProjects.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {groupProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
