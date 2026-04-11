import { BrandHomeProfile, SocialLink } from "@workspace/api-client-react";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  profile: BrandHomeProfile;
  socials: SocialLink[];
}

export default function Footer({ profile, socials }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <span className="font-mono text-lg font-bold text-primary tracking-tighter">/</span>
              <span className="font-mono text-lg font-bold text-foreground tracking-tighter">HS</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              {profile.headline}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-medium text-white/30 uppercase tracking-wider">Links</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Startups", href: "#startups" },
                { label: "Projetos", href: "#projects" },
                { label: "Curso", href: "#course" },
                { label: "Textos", href: "#writing" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-medium text-white/30 uppercase tracking-wider">Social</h4>
            <div className="flex flex-col gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.04] flex items-center justify-between">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <p className="text-xs text-white/25">{profile.domain}</p>
        </div>
      </div>
    </footer>
  );
}
