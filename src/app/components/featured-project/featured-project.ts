import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  readonly translationService = inject(TranslationService);

  get t() {
    return this.translationService.t();
  }

  // Enterprise Solutions: Abstract representation
  readonly enterpriseProjects = computed(() => {
    const t = this.translationService.t().projects;
    return [
      {
        title: t.gabiaTitle,
        date: t.gabiaDate,
        description: t.gabia,
        tags: ['React', 'TypeScript', 'Python', 'OpenAI', 'Clean Arch'],
        iconText: 'GabIA'
      },
      {
        title: t.sisleiaTitle,
        date: t.sisleiaDate,
        description: t.sisleia,
        tags: ['React', 'TypeScript', 'Python', 'OpenAI', 'Clean Arch'],
        iconText: 'SISLEIA'
      }
    ];
  });

  // Personal Projects: Visual representation
  readonly personalProjects = computed(() => {
    const t = this.translationService.t().projects;
    const isPt = this.translationService.language() === 'pt';
    return [
      {
        title: 'PerCurso',
        date: t.percursoDate,
        award: isPt ? '🏆 2º Lugar Hackathon' : '🏆 2nd Place Hackathon',
        description: t.percurso,
        tags: ['Next.js 15', 'React', 'Markdown (Remark)', 'CSS Modules', 'SSG'],
        imageUrl: 'percurso/percurso.webp',
        imageWidth: 1200,
        imageHeight: 675,
        githubLink: 'https://github.com/luigischmitt/PerCurso',
        deployLink: undefined
      },
      {
        title: 'CineMatch',
        date: t.cinematchDate,
        award: undefined,
        description: t.cinematch,
        tags: ['Angular', 'SCSS', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Docker'],
        imageUrl: 'cinematch/dashboard.webp',
        imageWidth: 1200,
        imageHeight: 597,
        githubLink: 'https://github.com/Nicolas-Kleiton/CineMatch',
        deployLink: 'https://cinematch-br.vercel.app'
      }
    ];
  });
}
