import { BrandHomeProfile } from "@workspace/api-client-react";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  profile: BrandHomeProfile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[#00D9A3]/8 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#7C3AED]/8 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Aberto a novas oportunidades
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-balance leading-[1.1] md:leading-[1.05] max-w-4xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          {profile.headline}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-[1.7] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {profile.bio}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
          <a 
            href="#startups" 
            className="group flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Ver meu trabalho
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#newsletter" 
            className="flex items-center justify-center h-12 px-8 rounded-full border border-border bg-transparent hover:bg-muted text-foreground font-medium text-lg transition-colors"
          >
            Ler meus textos
          </a>
        </div>
      </div>
    </section>
  );
}
