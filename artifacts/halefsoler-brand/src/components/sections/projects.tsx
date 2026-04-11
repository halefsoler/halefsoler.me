import { Project } from "@workspace/api-client-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">Projetos</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] max-w-xl text-white">
            Projetos selecionados
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-primary/80 tracking-wider uppercase">{project.category}</span>
                <span className="text-xs text-white/40 font-mono">{project.year}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-[-0.02em] mb-3 text-white group-hover:text-primary transition-colors">
                {project.name}
              </h3>

              <p className="text-sm text-white/50 leading-[1.7] mb-6">
                {project.description}
              </p>

              <div className="text-sm text-white/60 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.04]">
                {project.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
