import { Metric } from "@workspace/api-client-react";

interface MetricsSectionProps {
  metrics: Metric[];
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="py-24 bg-card/50 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center pt-12 md:pt-0 first:pt-0 px-4">
              <span className="text-5xl md:text-6xl font-serif tracking-[-0.03em] mb-4 text-primary">
                {metric.value}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 tracking-[-0.02em]">{metric.label}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
