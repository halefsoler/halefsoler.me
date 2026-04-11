import { Metric } from "@workspace/api-client-react";

interface MetricsSectionProps {
  metrics: Metric[];
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="py-20 border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4 py-6 rounded-2xl hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-white mb-3">
                {metric.value}
              </span>
              <span className="text-sm font-medium text-white/80 mb-1">{metric.label}</span>
              <span className="text-xs text-white/40 leading-relaxed max-w-[180px]">{metric.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
