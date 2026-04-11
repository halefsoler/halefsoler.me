import { BrandHomeProfile } from "@workspace/api-client-react";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  profile: BrandHomeProfile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[128px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Aberto a novas oportunidades
        </div>

        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05] max-w-[900px] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-balance text-foreground">
          {profile.headline}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-[1.7] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {profile.bio}
        </p>

        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <a
            href="#startups"
            className="group inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Ver meu trabalho
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#newsletter"
            className="inline-flex items-center h-11 px-6 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            Ler meus textos
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
