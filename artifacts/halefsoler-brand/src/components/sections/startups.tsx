import { Startup } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StartupsSectionProps {
  startups: Startup[];
}

export default function StartupsSection({ startups }: StartupsSectionProps) {
  return (
    <section id="startups" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">
            Startups fundadas
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Construção de empresas do zero ao um, conectando oportunidade,
            produto, narrativa, times e crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {startups.map((startup, index) => (
            <Card
              key={index}
              className="bg-white/2 border-white/10 p-8 md:p-10 flex flex-col hover:bg-white/5 transition-colors group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-serif tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {startup.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-foreground">
                      {startup.role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-muted-foreground">
                      {startup.period}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                {startup.summary}
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Principais resultados
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {startup.outcomes.map((outcome, i) => (
                    <li key={i}>
                      <Badge
                        variant="outline"
                        className="bg-black/20 border-white/10 text-foreground/80 hover:bg-black/40 rounded-full px-3 py-1 text-xs font-normal"
                      >
                        {outcome}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
