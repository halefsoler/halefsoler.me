import { Project } from "@workspace/api-client-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-28 border-t border-border/50">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">Projetos</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] max-w-xl">
            Projetos selecionados
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-primary/80 tracking-wider uppercase">{project.category}</span>
                <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-[-0.02em] mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>

              <p className="text-sm text-muted-foreground leading-[1.7] mb-6">
                {project.description}
              </p>

              <div className="text-sm text-foreground/80 bg-muted/50 rounded-xl px-4 py-3 border border-border/60">
                {project.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
