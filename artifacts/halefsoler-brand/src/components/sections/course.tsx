import { Course } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface CourseSectionProps {
  course: Course;
}

export default function CourseSection({ course }: CourseSectionProps) {
  return (
    <section id="course" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-[#7C3AED]/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-transparent border border-border/50 rounded-[2rem] p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {course.status}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[-0.03em] mb-6">
              {course.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground font-medium mb-6 tracking-[-0.02em]">
              {course.subtitle}
            </p>
            
            <p className="text-lg text-muted-foreground leading-[1.7] mb-10">
              {course.description}
            </p>
            
            <Button size="lg" className="rounded-full px-8 text-base h-14 w-full sm:w-auto group bg-primary text-primary-foreground hover:bg-primary/90">
              Entrar na lista de espera
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-card/60 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-8 tracking-[-0.02em]">Currículo do curso</h3>
              <ul className="space-y-6">
                {course.modules.map((module, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 text-primary">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="text-lg text-foreground/90">{module}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
