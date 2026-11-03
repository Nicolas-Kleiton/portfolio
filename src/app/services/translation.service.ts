import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export type Language = 'pt' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly language = signal<Language>('pt');

  readonly translations = {
    pt: {
      meta: {
        htmlLang: 'pt-BR',
        title: 'Nicolas Kleiton | Desenvolvedor Fullstack',
        description: 'Portfólio de Nicolas Kleiton, Desenvolvedor Fullstack e Engenheiro de Software. Interfaces com React e Angular, backends em Python e soluções com IA.'
      },
      navbar: {
        home: 'Início',
        about: 'Sobre Mim',
        projects: 'Projetos',
        contact: 'Contato'
      },
      hero: {
        greeting: '👋, meu nome é Nicolas e',
        imA: 'EU SOU',
        roles: ['DESENVOLVEDOR FULLSTACK', 'ENGENHEIRO DE SOFTWARE']
      },
      about: {
        subtitle: 'QUEM SOU EU',
        title: 'Desenvolvedor Fullstack',
        bio: 'Estudante de Ciência da Computação na <strong>Universidade Federal da Paraíba (UFPB)</strong> e Engenheiro de Software no <strong>CEBRASPE</strong> e <strong>TRIL LAB</strong>. Atuo em todo o ciclo de vida de desenvolvimento, da validação de requisitos à arquitetura de sistemas complexos. Como <strong>Desenvolvedor Fullstack</strong>, construo interfaces de alta performance com <strong>React</strong> e backends escaláveis em <strong>Python</strong>, aproveitando <strong>modelos de IA</strong> para transformar demandas desafiadoras em soluções automatizadas e de alta eficiência.',
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
        skills: {
          frontend: 'TypeScript, React, Angular, HTML/CSS',
          backend: 'C, Java, PHP, Laravel, Python, FastAPI, MySQL, SQL Server',
          infra: 'Docker, Git, Arquitetura Limpa',
          ai: 'Integração com LLM (OpenAI), Engenharia de Prompt'
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
        gabiaTitle: 'GabIA — Análise de Recursos',
        gabiaDate: '03/2025 — Presente',
        gabia: 'Desenvolvimento de ponta a ponta, desde requisitos até manutenção. Implementei Clean Architecture para <strong>reduzir a análise manual do auditor em 80%</strong>. Desenvolvi pipelines Python com OpenAI e Engenharia de Prompt para categorização de documentos.',
        sisleiaTitle: 'SISLEIA — Avaliação de Leitura',
        sisleiaDate: '09/2025 — 05/2026',
        sisleia: 'Arquitetura de um PWA de alta performance para análise de fluência em leitura. <strong>Automatizei 100% do fluxo de avaliação</strong>, reduzindo o tempo de análise de áudio de horas para segundos por aluno via integração de IA e FastAPI.',
        percursoDate: '11/2024 — 12/2024',
        percurso: 'Uma plataforma colaborativa open-source desenvolvida por uma equipe de 3 para centralizar materiais de estudo para estudantes universitários. Trabalhamos juntos em toda a aplicação, construindo a arquitetura escalável com Next.js dynamic routing e um sistema recursivo de parsing de Markdown. Minhas contribuições abrangeram todo o stack, desde lógica de roteamento e mapeamento de dados até a implementação da UI responsiva e otimização de desempenho com Geração de Site Estático (SSG).',
        cinematchDate: '05/2026 — 06/2026',
        cinematch: 'Uma plataforma web full-stack projetada para organizar e gerenciar sessões de cinema. Construí todo o sistema desenvolvendo um catálogo com busca, uma roleta interativa para sorteio de filmes e um histórico pessoal de avaliações. Para simplificar o teste da aplicação, implementei um modo de visitante, operando em paralelo à autenticação segura com JWT para usuários registrados.'
      },
      contact: {
        subtitle: 'QUAL O PRÓXIMO PASSO?',
        title: 'Vamos trabalhar juntos.',
        description: 'Atualmente estou aberto a novas oportunidades. Se você tiver alguma dúvida ou apenas quiser dizer um oi, minha caixa de entrada está sempre aberta. Farei o meu melhor para responder!',
        sayHello: 'Diga Olá',
        copyright: 'Desenhado & Desenvolvido por Nicolas Kleiton © 2026',
        resume: 'Currículo'
      }
    },
    en: {
      meta: {
        htmlLang: 'en',
        title: 'Nicolas Kleiton | Fullstack Developer',
        description: 'Portfolio of Nicolas Kleiton, Fullstack Developer and Software Engineer. Interfaces with React and Angular, Python backends and AI-powered solutions.'
      },
      navbar: {
        home: 'Home',
        about: 'About Me',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        greeting: '👋, my name is Nicolas and',
        imA: "I'M A",
        roles: ['FULLSTACK DEVELOPER', 'SOFTWARE ENGINEER']
      },
      about: {
        subtitle: 'WHO I AM',
        title: 'Fullstack Developer',
        bio: 'Computer Science student at <strong>Federal University of Paraíba (UFPB)</strong> and Software Engineer at <strong>CEBRASPE</strong> and <strong>TRIL LAB</strong>. I operate across the full development lifecycle—from requirement validation to the architecture of complex systems. As a <strong>Fullstack Developer</strong>, I build high-performance interfaces with <strong>React</strong> and scalable backends in <strong>Python</strong>, leveraging <strong>AI models</strong> to transform challenging demands into automated, high-efficiency solutions.',
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
        skills: {
          frontend: 'TypeScript, React, Angular, HTML/CSS',
          backend: 'C, Java, PHP, Laravel, Python, FastAPI, MySQL, SQL Server',
          infra: 'Docker, Git, Clean Architecture',
          ai: 'LLM Integration (OpenAI), Prompt Engineering'
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
        gabiaTitle: 'GabIA — Resource Analysis',
        gabiaDate: '03/2025 — Present',
        gabia: 'Full-cycle development from requirements to maintenance. Implemented Clean Architecture to <strong>reduce manual auditor analysis by 80%</strong>. Built Python pipelines with OpenAI and Prompt Engineering for document categorization.',
        sisleiaTitle: 'SISLEIA — Reading Evaluation',
        sisleiaDate: '09/2025 — 05/2026',
        sisleia: 'Architected a high-performance PWA for reading fluency analysis. <strong>Automated 100% of the evaluation flow</strong>, reducing audio analysis time from hours to seconds per student via AI integration and FastAPI.',
        percursoDate: '11/2024 — 12/2024',
        percurso: 'An open-source collaborative platform developed by a team of 3 to centralize study materials for university students. We worked together across the entire application, building the scalable architecture with Next.js dynamic routing and a recursive Markdown parsing system. My contributions spanned the full stack, from routing logic and data mapping to implementing the responsive UI and optimizing performance with Static Site Generation (SSG).',
        cinematchDate: '05/2026 — 06/2026',
        cinematch: 'A full-stack web platform designed to organize and manage movie sessions. I built the entire system by developing a searchable catalog, an interactive roulette for random movie selections, and a personal evaluation history. To simplify application testing, I implemented a guest mode, operating alongside secure JWT authentication for registered users.'
      },
      contact: {
        subtitle: "WHAT'S NEXT?",
        title: "Let's work together.",
        description: 'I am currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open. I\'ll try my best to get back to you!',
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
    // Keep <html lang>, <title> and the meta description in sync with the selected language
    effect(() => {
      const { htmlLang, title, description } = this.t().meta;
      this.document.documentElement.lang = htmlLang;
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
    });
  }

  toggleLanguage() {
    this.language.update(l => l === 'pt' ? 'en' : 'pt');
  }

  setLanguage(lang: Language) {
    this.language.set(lang);
  }
}
