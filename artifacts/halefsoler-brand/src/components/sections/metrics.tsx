import { Metric } from "@workspace/api-client-react";

interface MetricsSectionProps {
  metrics: Metric[];
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="py-24 bg-white/2 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center py-10 md:py-0 first:pt-0 last:pb-0 px-4 w-full">
              <span className="block w-full text-center text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight mb-4 text-foreground break-words">
                {metric.value}
              </span>
              <h3 className="text-lg font-medium text-foreground mb-2 text-center w-full">{metric.label}</h3>
              <p className="text-sm text-muted-foreground max-w-[200px] text-center mx-auto">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
