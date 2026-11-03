import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  readonly translationService = inject(TranslationService);

  get t() {
    return this.translationService.t();
  }

  // Enterprise Solutions: Abstract representation
  get enterpriseProjects() {
    // Add cast or standard indexing to allow TypeScript compiler to resolve keys dynamically
    const t = this.t.projects as any;
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
  }

  // Personal Projects: Visual representation
  get personalProjects() {
    const t = this.t.projects as any;
    return [
      {
        title: 'PerCurso',
        date: t.percursoDate,
        award: this.translationService.language() === 'pt' ? '🏆 2º Lugar Hackathon' : '🏆 2nd Place Hackathon',
        description: t.percurso,
        tags: ['Next.js 15', 'React', 'Markdown (Remark)', 'CSS Modules', 'SSG'],
        imageUrl: 'percurso/percurso.webp',
        imageWidth: 1200,
        imageHeight: 675,
        githubLink: 'https://github.com/luigischmitt/PerCurso'
      },
      {
        title: 'CineMatch',
        date: t.cinematchDate,
        description: t.cinematch,
        tags: ['Angular', 'SCSS', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Docker'],
        imageUrl: 'cinematch/dashboard.webp',
        imageWidth: 1200,
        imageHeight: 597,
        githubLink: 'https://github.com/Nicolas-Kleiton/CineMatch',
        deployLink: 'https://cinematch-br.vercel.app'
      }
    ];
  }
}
