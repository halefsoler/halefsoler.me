import { Link } from "wouter";
import { BrandHomeProfile, SocialLink } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  profile?: BrandHomeProfile;
  socials?: SocialLink[];
}

export default function Navbar({ profile, socials }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Startups", href: "#startups" },
    { label: "Projetos", href: "#projects" },
    { label: "Curso", href: "#course" },
    { label: "Textos", href: "#writing" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <span className="font-mono text-lg font-bold text-primary tracking-tighter">/</span>
          <span className="font-mono text-lg font-bold text-foreground tracking-tighter">HS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#newsletter"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Newsletter
          </a>
          <Button size="sm" className="rounded-full px-5 h-9 text-sm font-medium bg-foreground text-background hover:bg-foreground/90" asChild>
            <a href="#newsletter">Inscrever-se</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full rounded-full mt-2 bg-foreground text-background hover:bg-foreground/90" asChild>
            <a href="#newsletter" onClick={() => setIsOpen(false)}>Inscrever-se</a>
          </Button>
        </div>
      )}
    </header>
  );
}
