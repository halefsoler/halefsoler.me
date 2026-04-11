import { Startup } from "@workspace/api-client-react";

interface StartupsSectionProps {
  startups: Startup[];
}

export default function StartupsSection({ startups }: StartupsSectionProps) {
  return (
    <section id="startups" className="py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">Startups</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] max-w-xl text-white">
            Construindo do zero ao um
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {startup.role}
                </span>
                <span className="text-xs text-white/40">{startup.period}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-[-0.02em] mb-4 text-white group-hover:text-primary transition-colors">
                {startup.name}
              </h3>

              <p className="text-sm text-white/50 leading-[1.7] mb-8 flex-grow">
                {startup.summary}
              </p>

              <ul className="space-y-2.5 border-t border-white/[0.06] pt-6">
                {startup.outcomes.map((outcome: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-primary" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
