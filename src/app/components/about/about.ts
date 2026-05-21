import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  readonly translationService = inject(TranslationService);

  get t() {
    return this.translationService.t();
  }

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
  get educationList() {
    const aboutT = this.t.about;
    return [
      { title: aboutT.eduTitle, highlight: aboutT.eduHighlight, subtext: aboutT.eduSubtext }
    ];
  }

  get achievementsList() {
    const aboutT = this.t.about;
    return [
      { title: aboutT.achTitle, highlight: aboutT.achHighlight }
    ];
  }

  get allSkills() {
    const aboutT = this.t.about;
    return [
      { category: 'Frontend', items: aboutT.skills.frontend, type: 'frontend' },
      { category: 'Backend & DB', items: aboutT.skills.backend, type: 'backend' },
      { category: 'Infrastructure', items: aboutT.skills.infra, type: 'tools' },
      { category: 'Artificial Intelligence', items: aboutT.skills.ai, type: 'tools' }
    ];
  }

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
