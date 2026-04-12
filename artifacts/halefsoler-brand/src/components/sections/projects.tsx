import { Project } from "@workspace/api-client-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-32 bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Projetos selecionados</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Uma curadoria de iniciativas, consultorias, produtos e papéis operacionais com impacto em diferentes mercados.
          </p>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-8 border-b border-white/10 last:border-0 hover:bg-white/2 transition-colors px-4 -mx-4 rounded-xl"
            >
              <div className="md:w-1/4 shrink-0 pt-1">
                <div className="text-sm font-medium text-muted-foreground mb-1">{project.year}</div>
                <div className="text-xs uppercase tracking-wider text-white/40 font-semibold">{project.category}</div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-serif tracking-tight mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="inline-flex items-center text-sm font-medium text-foreground bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                  {project.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
