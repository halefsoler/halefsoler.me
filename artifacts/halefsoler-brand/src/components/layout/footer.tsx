import { BrandHomeProfile, SocialLink } from "@workspace/api-client-react";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  profile: BrandHomeProfile;
  socials: SocialLink[];
}

export default function Footer({ profile, socials }: FooterProps) {
  return (
    <footer className="border-t border-border/50 bg-card/30 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-0">
              <span className="font-mono text-3xl font-bold text-primary tracking-tighter">/</span>
              <span className="font-mono text-3xl font-bold text-foreground tracking-tighter">HS</span>
            </div>
            <p className="text-muted-foreground max-w-sm text-lg leading-[1.7]">
              {profile.headline}
            </p>
            <p className="text-sm text-muted-foreground/60 mt-auto pt-8">
              &copy; {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-8">
            <div className="flex flex-col gap-4 md:items-end">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Conecte-se</h4>
              <ul className="flex flex-col gap-3 md:items-end">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1 text-lg hover:text-primary transition-colors"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
