import { Link } from "wouter";
import { BrandHomeProfile, SocialLink } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  profile?: BrandHomeProfile;
  socials?: SocialLink[];
}

export default function Navbar({ profile, socials }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const domain = profile?.domain ?? "halefsoler.io";

  const navLinks = [
    { label: "Startups", href: "#startups" },
    { label: "Projetos", href: "#projects" },
    { label: "Curso", href: "#course" },
    { label: "Newsletter", href: "#writing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt={domain} className="h-8" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <Button variant="default" size="sm" className="rounded-full px-6 font-medium" asChild>
              <a href="#course">Aulas disponíveis</a>
            </Button>
          </div>
        </nav>

        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-white/5 p-6 flex flex-col gap-6 shadow-xl">
          <div className="flex flex-col gap-4 text-lg font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button variant="default" className="w-full rounded-full" asChild>
            <a href="#newsletter" onClick={() => setIsOpen(false)}>Inscrever-se</a>
          </Button>
        </div>
      )}
    </header>
  );
}
