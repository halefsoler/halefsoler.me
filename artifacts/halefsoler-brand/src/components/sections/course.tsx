import { Course, useJoinCourseWaitlist } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface CourseSectionProps {
  course: Course;
}

export default function CourseSection({ course }: CourseSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const joinWaitlist = useJoinCourseWaitlist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    joinWaitlist.mutate(
      { data: { email, source: "course_section" } },
      {
        onSuccess: () => {
          toast({
            title: "Inscrição confirmada",
            description: "Você entrou na lista de espera do curso. Avisaremos quando estiver disponível.",
          });
          setEmail("");
          setShowForm(false);
        },
        onError: (error: any) => {
          toast({
            title: "Não foi possível inscrever",
            description: error?.error?.error || "Algo deu errado. Tente novamente.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <section id="course" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {course.status}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-6">
              {course.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground font-medium mb-6">
              {course.subtitle}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {course.description}
            </p>
            
            {!showForm ? (
              <Button 
                size="lg" 
                className="rounded-full px-8 text-base h-14 w-full sm:w-auto group"
                onClick={() => setShowForm(true)}
              >
                Entrar na lista de espera
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground rounded-full px-6 min-w-[280px]"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full px-8 text-base h-14 group"
                  disabled={joinWaitlist.isPending}
                >
                  {joinWaitlist.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Confirmar
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-8">Currículo do curso</h3>
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
