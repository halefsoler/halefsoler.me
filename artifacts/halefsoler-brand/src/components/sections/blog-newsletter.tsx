import { BlogPost, useSubscribeNewsletter } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface BlogNewsletterSectionProps {
  posts: BlogPost[];
}

export default function BlogNewsletterSection({ posts }: BlogNewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const subscribe = useSubscribeNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    subscribe.mutate(
      { data: { email, source: "homepage_footer" } },
      {
        onSuccess: () => {
          toast({
            title: "Inscrição confirmada",
            description: "Obrigado por entrar na newsletter. O próximo envio chegará em breve.",
          });
          setEmail("");
        },
        onError: (error) => {
          toast({
            title: "Não foi possível inscrever",
            description: error.error?.error || "Algo deu errado. Tente novamente.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <section id="writing" className="py-32 relative">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Textos recentes</h2>
              <p className="text-xl text-muted-foreground">Ideias sobre startups, produto, marca pessoal, educação e tecnologia.</p>
            </div>

            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="group border-b border-white/10 pb-8 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="uppercase tracking-wider font-semibold text-white/50">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.publishedAt}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readTime} de leitura</span>
                  </div>
                  <h3 className="text-2xl font-serif tracking-tight mb-3 group-hover:text-primary transition-colors">
                    <a href={`/blog/${post.slug}`} className="block">{post.title}</a>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <a href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Ler artigo <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </article>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            <div className="sticky top-32 bg-white/2 border border-white/10 rounded-3xl p-8 md:p-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-serif tracking-tight mb-4">Entre na newsletter</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Receba ensaios sobre construção de produtos, marca pessoal, growth e bastidores de operação direto no seu inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-4" id="newsletter">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-full bg-black/20 border-white/10 text-center text-lg placeholder:text-muted-foreground/50 focus-visible:ring-white/20"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 rounded-full text-base w-full group"
                  disabled={subscribe.isPending}
                >
                  {subscribe.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Quero receber
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Sem spam. Saia quando quiser.</p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
