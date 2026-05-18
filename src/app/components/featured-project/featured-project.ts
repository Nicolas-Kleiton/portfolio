import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  // Enterprise Solutions: Abstract representation
  enterpriseProjects = [
    {
      title: 'GabIA — Resource Analysis',
      date: '03/2025 — Present',
      description: 'Full-cycle development from requirements to maintenance. Implemented Clean Architecture to <strong>reduce manual auditor analysis by 80%</strong>. Built Python pipelines with OpenAI and Prompt Engineering for document categorization.',
      tags: ['React', 'TypeScript', 'Python', 'OpenAI', 'Clean Arch'],
      iconText: 'GabIA'
    },
    {
      title: 'SISLEIA — Reading Evaluation',
      date: 'Final Delivery',
      description: 'Architected a high-performance PWA for reading fluency analysis. <strong>Automated 100% of the evaluation flow</strong>, reducing audio analysis time from hours to seconds per student via AI integration and FastAPI.',
      tags: ['React', 'TypeScript', 'Python', 'OpenAI', 'Clean Arch'],
      iconText: 'SISLEIA'
    }
  ];

  // Personal Projects: Visual representation
  personalProjects = [
    {
      title: 'PerCurso',
      date: '2024 - Present',
      description: 'An open-source collaborative platform developed by a team of 3 to centralize study materials for university students. We worked together across the entire application, building the scalable architecture with Next.js dynamic routing and a recursive Markdown parsing system. My contributions spanned the full stack, from routing logic and data mapping to implementing the responsive UI and optimizing performance with Static Site Generation (SSG).',
      tags: ['Next.js 15', 'React', 'Markdown (Remark)', 'CSS Modules', 'SSG'],
      imageUrl: 'percurso/percurso.png',
      githubLink: 'https://github.com/luigischmitt/PerCurso'
    }
  ]
    // Add more personal projects here simply by duplicating this object!
}
