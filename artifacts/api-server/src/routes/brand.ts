import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable, courseWaitinglistTable } from "@workspace/db";
import {
  GetBrandHomeResponse,
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
  JoinCourseWaitlistBody,
  JoinCourseWaitlistResponse,
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
      role: "Founder",
      period: "2021 - 2024",
      summary:
        "Log-tech focada em Delivery de mobílias pet & baby em parceria com Rede Hoteleira, Airbnb e Locadoras de veículo",
      outcomes: [
        "E-commerce automatizado com last-mile delivery",
        "Full integrado com players de Hotelaria e Locação de carros",
        "Especializados em Higienização & Warehouse",
      ],
    },
  ],
  projects: [
    {
      name: "Award | Rede Líderes",
      category: "AWARD",
      year: "2026",
      description:
        "Somos um ecossistema de líderes e empresas que revoluciona a geração de negócios, oportunidades e relacionamentos",
      impact:
        "Abril de 2026 foi quando fui reconhecido dentro do Universo de 900 conselheiros para o ano de 2025.",
    },
    {
      name: "Oracle Innovation Center #BR",
      category: "Expansion",
      year: "2025",
      description:
        "Pipeline de U$20B com receita de U$3B em um projeto investido de R$40M, 45 mantenedores, 9 meses (do MVP ao Go Live) e 61 squads.",
      impact:
        "Esse é o quarto Oracle Innovation Center da Oracle no Mundo, mas único em uma subsidiária de Vendas",
    },
    {
      name: "Loja Conceito",
      category: "RETAIL",
      year: "2022",
      description:
        "A primeira Loja Conceito da Oracle no Mundo, criada dentro da Casa Oracle",
      impact:
        "Gerado U$115M em 1 ano com conversion rate de 20% e mais de 12 startups envolvidas.",
    },
    {
      name: "Casa Oracle",
      category: "ECOSSYSTEM",
      year: "2019",
      description:
        "Hub Oracle de Startups, VCs, Encontros e Labs para Empresas.",
      impact:
        "Mais de 2k visitas em 3 anos e meio e mais de 60 projetos co-criados com time de Inovação.",
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
      "Arquitetura de conteúdo e escolhas",
      "Storytelling, Decisão, Execução",
      "Sistemas e empresas em estado crítico",
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
    { label: "LinkedIn", url: "https://www.linkedin.com/in/halefsoler/" },
    { label: "Instagram", url: "https://instagram.com/halefsoler" },
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

router.post("/course-waitlist", async (req, res): Promise<void> => {
  const parsed = JoinCourseWaitlistBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid course waitlist input");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const email = parsed.data.email.trim().toLowerCase();
  const [entry] = await db
    .insert(courseWaitinglistTable)
    .values({
      email,
      name: parsed.data.name?.trim() || null,
      source: parsed.data.source?.trim() || "course_page",
    })
    .onConflictDoUpdate({
      target: courseWaitinglistTable.email,
      set: {
        name: parsed.data.name?.trim() || null,
        source: parsed.data.source?.trim() || "course_page",
      },
    })
    .returning();

  res.json(
    JoinCourseWaitlistResponse.parse({
      id: entry.id,
      email: entry.email,
      name: entry.name,
      source: entry.source,
      createdAt: entry.createdAt.toISOString(),
    }),
  );
});

export default router;