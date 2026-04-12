import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import {
  GetBrandHomeResponse,
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const brandHome = {
  profile: {
    name: "Halef Soler",
    domain: "halefsoler.io",
    headline:
      "Construindo startups, produtos e narrativas para transformar expertise em crescimento real.",
    bio: "Founder e operador focado em estratégia, produto, growth e comportamento. Aqui eu reúno aprendizados de startups, cases, projetos, curso e uma newsletter para pessoas que querem construir com mais clareza, velocidade e profundidade.",
  },
  metrics: [
    {
      label: "Startups",
      value: "3+",
      detail: "Negócios fundados, validados ou escalados em ciclos de produto e crescimento.",
    },
    {
      label: "Resultados",
      value: "U$3 bilhões",
      detail: "Impacto gerado em receita, eficiência comercial e posicionamento digital.",
    },
    {
      label: "Projetos",
      value: "40+",
      detail: "Participações entre produto, aquisição, conteúdo, tecnologia e educação.",
    },
  ],
  startups: [
    {
      name: "hiGen",
      role: "Founder & CEO",
      period: "Atual",
      summary:
        "Ressignificamos a busca e aplicação de vagas para quem está nessa longa e dolorosa jornada.",
      outcomes: [
        "Da tese ao MVP com ciclos curtos de aprendizado",
        "Estruturação de narrativa comercial e canais de aquisição",
        "Arquitetura de ofertas, comunidades e produtos educacionais",
      ],
    },
    {
      name: "StartStop",
      role: "Co-founder & Advisor",
      period: "Atual",
      summary:
        "O primeiro video-cast 100% Autonomo no mundo nasceu e agora voce só precisa falar.",
      outcomes: [
        "Criação de playbooks de aquisição e conversão",
        "Projetos de posicionamento para marcas B2B e creator-led",
        "Integração entre estratégia, conteúdo e funis de venda",
      ],
    },
    {
      name: "Mini",
      role: "Creator",
      period: "Em expansão",
      summary:
        "Produtos de conhecimento para transformar experiência prática em método aplicável.",
      outcomes: [
        "Conteúdos e aulas sobre produto, marca pessoal e negócios digitais",
        "Frameworks para founders, creators e especialistas",
        "Comunidade em torno de execução e clareza estratégica",
      ],
    },
  ],
  projects: [
    {
      name: "Award | Rede Líderes",
      category: "AWARD",
      year: "2026",
      description:
        "Sistema editorial, posicionamento e canais para transformar autoridade em audiência e receita.",
      impact:
        "Base para newsletter, curso, social distribution e oportunidades de negócio.",
    },
    {
      name: "Playbooks de growth para startups",
      category: "Growth",
      year: "2025",
      description:
        "Modelos de aquisição, ativação e retenção desenhados para times enxutos.",
      impact:
        "Mais velocidade para testar hipóteses e reduzir desperdício em canais.",
    },
    {
      name: "Produtos educacionais premium",
      category: "Education",
      year: "2025",
      description:
        "Estruturação de currículo, oferta, narrativa e experiência de aprendizagem.",
      impact:
        "Transformação de conhecimento tácito em método vendável e escalável.",
    },
    {
      name: "Automação e inteligência operacional",
      category: "AI Systems",
      year: "2024",
      description:
        "Fluxos, agentes e integrações para reduzir trabalho manual e aumentar foco estratégico.",
      impact:
        "Mais consistência comercial, editorial e analítica para operações digitais.",
    },
  ],
  course: {
    title: "Strategist Toolkit: Ferramentas e processos que te abrirão os olhos para a Estratégia",
    subtitle: "Um curso para founders, especialistas e creators que querem construir autoridade composta.",
    description:
      "50 frameworks modernos de estratégia organizados em 7 módulos — todos pensados para te ajudar a ganhar tempo construindo estratégia.",
    status: "Lista de espera aberta",
    modules: [
      "Posicionamento e tese pessoal",
      "Arquitetura de conteúdo e newsletter",
      "Oferta, prova e distribuição",
      "Sistema semanal de criação e conversão",
    ],
  },
  blogPosts: [
    {
      slug: "marca-pessoal-como-ativo",
      title: "Marca pessoal como ativo, não como vaidade",
      excerpt:
        "Como transformar experiência acumulada em confiança, distribuição e novas oportunidades.",
      category: "Brand",
      publishedAt: "Abr 2026",
      readTime: "7 min",
    },
    {
      slug: "founder-led-growth",
      title: "Founder-led growth: quando o fundador vira canal",
      excerpt:
        "O que muda quando a narrativa do fundador passa a carregar aquisição, vendas e comunidade.",
      category: "Growth",
      publishedAt: "Abr 2026",
      readTime: "9 min",
    },
    {
      slug: "curso-produto-conhecimento",
      title: "Seu conhecimento só vira produto quando vira sistema",
      excerpt:
        "A diferença entre postar conteúdo, ensinar de verdade e criar um ativo educacional escalável.",
      category: "Education",
      publishedAt: "Mar 2026",
      readTime: "6 min",
    },
  ],
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/halefsoler" },
    { label: "Instagram", url: "https://instagram.com/halefsoler" },
    { label: "X", url: "https://x.com/halefsoler" },
    { label: "YouTube", url: "https://youtube.com/@halefsoler" },
  ],
};

router.get("/brand-home", (_req, res) => {
  res.json(GetBrandHomeResponse.parse(brandHome));
});

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid newsletter input");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const email = parsed.data.email.trim().toLowerCase();
  const [subscriber] = await db
    .insert(newsletterSubscribersTable)
    .values({
      email,
      name: parsed.data.name?.trim() || null,
      source: parsed.data.source?.trim() || "halefsoler.io",
    })
    .onConflictDoUpdate({
      target: newsletterSubscribersTable.email,
      set: {
        name: parsed.data.name?.trim() || null,
        source: parsed.data.source?.trim() || "halefsoler.io",
      },
    })
    .returning();

  res.json(
    SubscribeNewsletterResponse.parse({
      id: subscriber.id,
      email: subscriber.email,
      name: subscriber.name,
      source: subscriber.source,
      createdAt: subscriber.createdAt.toISOString(),
    }),
  );
});

export default router;