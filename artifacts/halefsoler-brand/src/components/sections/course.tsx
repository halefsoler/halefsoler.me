import { Course } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CourseSectionProps {
  course: Course;
}

export default function CourseSection({ course }: CourseSectionProps) {
  return (
    <section id="course" className="py-28 border-t border-border/50">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative rounded-3xl border border-border bg-muted/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-14 lg:p-16">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {course.status}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.03em] leading-[1.1] mb-5">
                {course.title}
              </h2>

              <p className="text-lg text-foreground/80 font-medium mb-4 tracking-[-0.01em]">
                {course.subtitle}
              </p>

              <p className="text-sm text-muted-foreground leading-[1.7] mb-10">
                {course.description}
              </p>

              <Button size="lg" className="rounded-full px-8 h-12 text-sm w-full sm:w-auto group self-start bg-foreground text-background hover:bg-foreground/90">
                Entrar na lista de espera
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center">
              <div className="w-full bg-background border border-border rounded-2xl p-8">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">Currículo</h3>
                <ul className="space-y-5">
                  {course.modules.map((module: string, index: number) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/90 leading-relaxed pt-1">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
