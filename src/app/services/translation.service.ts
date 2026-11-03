import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export type Language = 'pt' | 'en';

const STORAGE_KEY = 'lang';

function detectLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {
    // Storage unavailable (private mode, blocked cookies)
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Prerendered HTML is always Portuguese; the browser then applies the visitor's language
  readonly language = signal<Language>(isPlatformBrowser(inject(PLATFORM_ID)) ? detectLanguage() : 'pt');

  readonly translations = {
    pt: {
      meta: {
        htmlLang: 'pt-BR',
        title: 'Nicolas Kleiton | Engenheiro de Software e IA',
        description: 'Estudante de Ciência da Computação na UFPB e Engenheiro de Software. Desenvolvo sistemas com IA, LLMs, Python e FastAPI.'
      },
      navbar: {
        home: 'Início',
        about: 'Sobre Mim',
        projects: 'Projetos',
        contact: 'Contato',
        mainNav: 'Navegação principal',
        openMenu: 'Abrir menu',
        closeMenu: 'Fechar menu',
        switchLanguage: 'Mudar idioma para inglês'
      },
      hero: {
        greeting: '👋, meu nome é Nicolas e',
        imA: 'EU SOU',
        roles: ['ENGENHEIRO DE SOFTWARE', 'DESENVOLVEDOR FULLSTACK'],
        heading: 'Nicolas Kleiton, Engenheiro de Software e Desenvolvedor Fullstack',
        scroll: 'Role'
      },
      about: {
        subtitle: 'QUEM SOU EU',
        title: 'Engenheiro de Software',
        bio: 'Estudante de Ciência da Computação na <strong>Universidade Federal da Paraíba (UFPB)</strong>. Hoje sou engenheiro de software e pesquisador no <strong>TRIL LAB</strong>, laboratório de P&D da UFPB, e antes fui estagiário no <strong>CEBRASPE</strong>, onde trabalhei em dois sistemas com IA que entraram em produção. Meu foco é integrar <strong>LLMs</strong> a sistemas em <strong>Python</strong> e <strong>FastAPI</strong>, com frontend em <strong>React</strong> e TypeScript.',
        eduTitle: 'EDUCAÇÃO',
        eduHighlight: 'Bacharelado em Ciência da Computação',
        eduSubtext: 'UFPB (2024-2028)',
        achTitle: 'CONQUISTAS',
        achHighlight: '🏆 2º Lugar - Hackathon Trilhathon',
        techStack: 'STACK TÉCNICA',
        filterAll: 'Tudo',
        filterFrontend: 'Frontend',
        filterBackend: 'Backend',
        filterTools: 'Ferramentas & IA',
        filterLabel: 'Filtrar tecnologias',
        skills: {
          frontend: 'TypeScript, React, Angular, TailwindCSS, HTML/CSS',
          backend: 'Python, FastAPI, Java, Spring Boot, C#, .NET, PHP, Laravel, C, PostgreSQL, SQL Server, MySQL',
          infra: 'Docker, Git, Arquitetura Limpa',
          ai: 'LLMs (OpenAI API), ElevenLabs (Speech-to-Text), Engenharia de Prompt'
        },
        categories: {
          frontend: 'Frontend',
          backend: 'Backend & Banco de Dados',
          infra: 'Infraestrutura',
          ai: 'Inteligência Artificial'
        },
        downloadCv: 'BAIXAR CV',
        github: 'GITHUB',
        linkedin: 'LINKEDIN'
      },
      projects: {
        subtitle: 'PORTFÓLIO',
        title: 'Projetos em Destaque',
        enterprise: 'Soluções Corporativas',
        personal: 'Projetos Pessoais',
        viewRepo: 'VER REPOSITÓRIO',
        viewLive: 'VISITAR SITE',
        award: '🏆 2º Lugar Hackathon',
        confidential: 'Confidencial',
        gabiaMetric: '−80%',
        gabiaMetricLabel: 'de análise manual',
        sisleiaMetric: '100%',
        sisleiaMetricLabel: 'da avaliação automatizada',
        gabiaTitle: 'GabIA — Análise de Recursos',
        gabiaDate: '03/2025 — 08/2026',
        gabia: 'Sistema que ajuda auditores na análise de recursos. Escrevi os pipelines em Python que processam os documentos em lote com a API da OpenAI e usei engenharia de prompt para deixar a categorização mais precisa, o que <strong>reduziu em 80% o tempo de análise manual</strong>. Trabalhei do levantamento de requisitos à manutenção, incluindo a arquitetura do frontend.',
        sisleiaTitle: 'SISLEIA — Avaliação de Leitura',
        sisleiaDate: '09/2025 — 05/2026',
        sisleia: 'PWA que avalia a fluência de leitura de alunos a partir de gravações de áudio. <strong>Automatizou 100% da avaliação</strong> e reduziu a análise de minutos para segundos por aluno. Com a equipe, implementei e testei a etapa de IA: os áudios são transcritos pelo ElevenLabs e o texto vai para um LLM, que faz a análise de fluência. No backend, integrei essa etapa à plataforma e conectei o login ao OAuth2 do ecossistema Sinapse. Também estruturei o frontend.',
        percursoDate: '11/2024 — 12/2024',
        percurso: 'Plataforma open-source criada por uma equipe de 3 pessoas para ajudar estudantes do Centro de Informática da UFPB a planejar o curso e achar material de estudo. O conteúdo fica em Markdown no GitHub, e o site, feito em Next.js com geração estática (SSG), se atualiza sozinho quando o repositório muda. Trabalhei em todo o stack: rotas dinâmicas, parsing de Markdown e interface responsiva.',
        cinematchDate: '05/2026 — 06/2026',
        cinematch: 'Aplicação web full-stack para organizar sessões de cinema. Fiz o sistema inteiro: catálogo com busca, roleta para sortear filmes e histórico pessoal de avaliações. Para facilitar os testes, criei um modo visitante que funciona junto com a autenticação via JWT para usuários cadastrados.'
      },
      contact: {
        subtitle: 'QUAL O PRÓXIMO PASSO?',
        title: 'Vamos trabalhar juntos.',
        description: 'Estou aberto a oportunidades de estágio e a projetos com IA. Se quiser conversar, é só mandar um e-mail.',
        sayHello: 'Diga Olá',
        copyright: 'Desenhado & Desenvolvido por Nicolas Kleiton © 2026',
        resume: 'Currículo'
      }
    },
    en: {
      meta: {
        htmlLang: 'en',
        title: 'Nicolas Kleiton | Software and AI Engineer',
        description: 'Computer Science student at UFPB and Software Engineer. I build systems with AI, LLMs, Python and FastAPI.'
      },
      navbar: {
        home: 'Home',
        about: 'About Me',
        projects: 'Projects',
        contact: 'Contact',
        mainNav: 'Main navigation',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        switchLanguage: 'Switch language to Portuguese'
      },
      hero: {
        greeting: '👋, my name is Nicolas and',
        imA: "I'M A",
        roles: ['SOFTWARE ENGINEER', 'FULLSTACK DEVELOPER'],
        heading: 'Nicolas Kleiton, Software Engineer and Fullstack Developer',
        scroll: 'Scroll'
      },
      about: {
        subtitle: 'WHO I AM',
        title: 'Software Engineer',
        bio: 'Computer Science student at the <strong>Federal University of Paraíba (UFPB)</strong>. I currently work as a software engineer and researcher at <strong>TRIL LAB</strong>, an R&D lab at UFPB, and before that I was an intern at <strong>CEBRASPE</strong>, where I worked on two AI systems that went into production. My focus is integrating <strong>LLMs</strong> into <strong>Python</strong> and <strong>FastAPI</strong> systems, with a <strong>React</strong> and TypeScript frontend.',
        eduTitle: 'EDUCATION',
        eduHighlight: 'B.S. in Computer Science',
        eduSubtext: 'UFPB (2024-2028)',
        achTitle: 'ACHIEVEMENTS',
        achHighlight: '🏆 2nd Place - Hackathon Trilhathon',
        techStack: 'TECHNICAL STACK',
        filterAll: 'All',
        filterFrontend: 'Frontend',
        filterBackend: 'Backend',
        filterTools: 'Tools & AI',
        filterLabel: 'Filter technologies',
        skills: {
          frontend: 'TypeScript, React, Angular, TailwindCSS, HTML/CSS',
          backend: 'Python, FastAPI, Java, Spring Boot, C#, .NET, PHP, Laravel, C, PostgreSQL, SQL Server, MySQL',
          infra: 'Docker, Git, Clean Architecture',
          ai: 'LLMs (OpenAI API), ElevenLabs (Speech-to-Text), Prompt Engineering'
        },
        categories: {
          frontend: 'Frontend',
          backend: 'Backend & DB',
          infra: 'Infrastructure',
          ai: 'Artificial Intelligence'
        },
        downloadCv: 'DOWNLOAD CV',
        github: 'GITHUB',
        linkedin: 'LINKEDIN'
      },
      projects: {
        subtitle: 'PORTFOLIO',
        title: 'Featured Projects',
        enterprise: 'Enterprise Solutions',
        personal: 'Personal Projects',
        viewRepo: 'VIEW REPOSITORY',
        viewLive: 'LIVE DEMO',
        award: '🏆 2nd Place Hackathon',
        confidential: 'Confidential',
        gabiaMetric: '−80%',
        gabiaMetricLabel: 'manual analysis',
        sisleiaMetric: '100%',
        sisleiaMetricLabel: 'of assessment automated',
        gabiaTitle: 'GabIA — Appeals Analysis',
        gabiaDate: '03/2025 — 08/2026',
        gabia: 'A system that helps auditors analyze appeals. I wrote the Python pipelines that batch-process the documents with the OpenAI API and used prompt engineering to make the categorization more accurate, which <strong>cut manual analysis time by 80%</strong>. I worked from requirements gathering to maintenance, including the frontend architecture.',
        sisleiaTitle: 'SISLEIA — Reading Evaluation',
        sisleiaDate: '09/2025 — 05/2026',
        sisleia: 'A PWA that assesses students\' reading fluency from audio recordings. It <strong>automated 100% of the assessment</strong> and cut the analysis from minutes to seconds per student. With the team, I implemented and tested the AI stage: the recordings are transcribed by ElevenLabs and the text goes to an LLM, which analyzes the fluency. On the backend, I integrated this stage into the platform and connected the login to the Sinapse ecosystem\'s OAuth2. I also structured the frontend.',
        percursoDate: '11/2024 — 12/2024',
        percurso: 'An open-source platform built by a team of 3 to help students at the UFPB Informatics Center plan their degree and find study material. The content lives in Markdown on GitHub, and the site, built with Next.js and static site generation (SSG), updates itself whenever the repository changes. I worked across the whole stack: dynamic routes, Markdown parsing and the responsive interface.',
        cinematchDate: '05/2026 — 06/2026',
        cinematch: 'A full-stack web app for organizing movie sessions. I built the entire system: a searchable catalog, a roulette to draw movies and a personal rating history. To make testing easier, I created a guest mode that works alongside JWT authentication for registered users.'
      },
      contact: {
        subtitle: "WHAT'S NEXT?",
        title: "Let's work together.",
        description: 'I am open to internship opportunities and AI projects. If you want to talk, just send me an email.',
        sayHello: 'Say Hello',
        copyright: 'Designed & Built by Nicolas Kleiton © 2026',
        resume: 'Resume'
      }
    }
  };

  readonly t = computed(() => this.translations[this.language()]);

  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    // Syncs <html lang>, <title> and meta description with the language
    effect(() => {
      const { htmlLang, title, description } = this.t().meta;
      this.document.documentElement.lang = htmlLang;
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
    });
  }

  toggleLanguage() {
    this.setLanguage(this.language() === 'pt' ? 'en' : 'pt');
  }

  setLanguage(lang: Language) {
    this.language.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage unavailable: keep the choice for this session only
    }
  }
}
