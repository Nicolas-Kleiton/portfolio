import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  @ViewChild('divider') dividerRef!: ElementRef;
  isRevealed = false;
  isIdle = false;

  ngAfterViewInit() {
    // Only run on the browser side, setting up the observer
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isRevealed) {
            this.isRevealed = true;
            // After the 1.5s reveal animation finishes, start the idle animations
            setTimeout(() => {
              this.isIdle = true;
            }, 1500);
          }
        });
      }, { threshold: 0.5 });

      if (this.dividerRef) {
        observer.observe(this.dividerRef.nativeElement);
      }
    }
  }
  // Data models for dynamic rendering
  educationList = [
    { title: 'EDUCATION', highlight: 'B.S. in Computer Science', subtext: 'UFPB (2024-2028)' }
  ];

  achievementsList = [
    { title: 'ACHIEVEMENTS', highlight: '🏆 2nd Place - Hackathon Trilhathon' }
  ];

  allSkills = [
    { category: 'Frontend', items: 'TypeScript, React, Angular, HTML/CSS', type: 'frontend' },
    { category: 'Backend & DB', items: 'C, Java, PHP, Laravel, Python, FastAPI, MySQL, SQL Server', type: 'backend' },
    { category: 'Infrastructure', items: 'Docker, Git, Clean Architecture', type: 'tools' },
    { category: 'Artificial Intelligence', items: 'LLM Integration (OpenAI), Prompt Engineering', type: 'tools' }
  ];

  // Current state for skill categorization
  activeFilter: string = 'all';

  // Getter to dynamically filter skills based on state
  get filteredSkills() {
    if (this.activeFilter === 'all') {
      return this.allSkills;
    }
    return this.allSkills.filter(skill => skill.type === this.activeFilter);
  }

  // Updates the filter state when a tab is clicked
  setFilter(filterType: string) {
    this.activeFilter = filterType;
  }
}
