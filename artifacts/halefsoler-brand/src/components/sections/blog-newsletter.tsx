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
        onError: (error: any) => {
          toast({
            title: "Não foi possível inscrever",
            description: error?.error?.error || "Algo deu errado. Tente novamente.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <section id="writing" className="py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="mb-12">
              <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">Blog</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white">Textos recentes</h2>
            </div>

            <div className="flex flex-col">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`group py-8 ${
                    index < posts.length - 1 ? "border-b border-white/[0.06]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                    <span className="font-medium text-primary/80 uppercase tracking-wider">{post.category}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                    <span>{post.publishedAt}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                    <span>{post.readTime} de leitura</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] mb-3 text-white group-hover:text-primary transition-colors cursor-default">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-[1.7]">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10" id="newsletter">
                <p className="text-sm font-medium text-primary tracking-wide uppercase mb-6">Newsletter</p>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] mb-4 text-white">Entre na newsletter</h3>
                <p className="text-sm text-white/50 leading-[1.7] mb-8">
                  Receba ensaios sobre construção de produtos, marca pessoal, growth e bastidores de operação direto no seu inbox.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl bg-white/[0.04] border-white/[0.08] text-sm text-white placeholder:text-white/30 focus-visible:ring-primary/30"
                  />
                  <Button
                    type="submit"
                    className="h-12 rounded-xl text-sm w-full group bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={subscribe.isPending}
                  >
                    {subscribe.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Quero receber
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-white/30 text-center mt-1">Sem spam. Saia quando quiser.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
