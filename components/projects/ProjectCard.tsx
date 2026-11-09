import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  readonly project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isGroup = project.type === "group";
  const hasLinks = Boolean(
    project.links && (project.links.repository || project.links.demo)
  );

  return (
    <article className="bg-[#121215] border border-zinc-800 rounded-sm p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-700 transition-colors">
      <div className="space-y-4">
        {/* 1. Category label & 3. Individual / Group Project badge */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff3b2f] font-medium">
            {project.category}
          </span>
          <span
            className={`font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
              isGroup
                ? "border-zinc-700 bg-zinc-900/60 text-zinc-300"
                : "border-zinc-800 text-zinc-400"
            }`}
          >
            {isGroup ? "Group Project" : "Individual Project"}
          </span>
        </div>

        {/* 2. Project name */}
        <h4 className="font-sans text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          {project.name}
        </h4>

        {/* 4. Summary */}
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          {project.summary}
        </p>

        {/* 5. Event, if applicable */}
        {project.event && (
          <div className="text-xs font-mono text-zinc-300 bg-zinc-900/40 border border-zinc-800/80 px-3 py-2 rounded-sm">
            <span className="text-zinc-500 uppercase tracking-wider mr-1.5">
              Event:
            </span>
            <span>{project.event}</span>
          </div>
        )}

        {/* 6. Evaluation, if applicable */}
        {project.evaluation && (
          <div className="text-xs font-mono text-zinc-300 bg-zinc-900/50 border border-zinc-800/80 p-3 rounded-sm leading-relaxed">
            <span className="text-zinc-400 font-semibold block mb-1">
              Evaluation:
            </span>
            <span>{project.evaluation}</span>
          </div>
        )}

        {/* 7. Team size, if applicable */}
        {project.teamSize && (
          <div className="text-xs font-mono text-zinc-300">
            <span className="text-zinc-500 uppercase tracking-wider mr-1.5">
              Team:
            </span>
            <span>{project.teamSize}</span>
          </div>
        )}

        {/* 8. My Role, if applicable (only for group projects) */}
        {project.myRole && (
          <div className="text-xs font-mono text-zinc-300 bg-zinc-900/60 border border-zinc-800 p-3 rounded-sm">
            <span className="text-zinc-400 font-semibold uppercase tracking-wider block mb-1">
              My Role:
            </span>
            <span>{project.myRole}</span>
          </div>
        )}

        {/* My Contributions, if applicable (for SAMUDRA SAKSHI) */}
        {project.myContributions && project.myContributions.length > 0 && (
          <div className="text-xs font-mono text-zinc-300 bg-zinc-900/60 border border-zinc-800 p-3 rounded-sm">
            <span className="text-zinc-400 font-semibold uppercase tracking-wider block mb-1.5">
              My Contributions:
            </span>
            <ul className="list-disc list-inside space-y-1 text-zinc-300">
              {project.myContributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-4">
        {/* 9. Technologies */}
        {project.technologies.length > 0 && (
          <ul
            className="flex flex-wrap gap-1.5"
            aria-label={`Technologies used in ${project.name}`}
          >
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="font-mono text-xs px-2.5 py-1 border border-zinc-800 text-zinc-300 rounded-sm bg-zinc-950/60"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* 10. Verified links, if applicable */}
        {hasLinks && (
          <div className="flex flex-wrap gap-3 pt-1">
            {project.links?.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] px-4 py-2 inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider text-zinc-100 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2 rounded-sm"
              >
                <span>Repository</span>
                <span className="sr-only"> for {project.name}</span>
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] px-4 py-2 inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider text-zinc-950 bg-zinc-100 font-semibold hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f] focus-visible:outline-offset-2 rounded-sm"
              >
                <span>Live Demo</span>
                <span className="sr-only"> for {project.name}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

