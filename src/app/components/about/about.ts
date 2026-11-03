import { Component, ElementRef, OnDestroy, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

type SkillFilter = 'all' | 'frontend' | 'backend' | 'tools';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnDestroy {
  readonly translationService = inject(TranslationService);

  get t() {
    return this.translationService.t();
  }

  private readonly divider = viewChild.required<ElementRef<HTMLElement>>('divider');
  private observer?: IntersectionObserver;
  private idleTimer?: ReturnType<typeof setTimeout>;

  // Signals so zoneless change detection sees observer/timer updates
  readonly isRevealed = signal(false);
  readonly isIdle = signal(false);

  constructor() {
    afterNextRender(() => this.observeDivider());
  }

  private observeDivider() {
    if (!('IntersectionObserver' in window)) {
      this.isRevealed.set(true);
      this.isIdle.set(true);
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        this.observer?.disconnect();
        this.isRevealed.set(true);
        // After the 1.5s reveal animation finishes, start the idle animations
        this.idleTimer = setTimeout(() => this.isIdle.set(true), 1500);
      }
    }, { threshold: 0.5 });

    this.observer.observe(this.divider().nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    clearTimeout(this.idleTimer);
  }

  readonly educationList = computed(() => {
    const aboutT = this.translationService.t().about;
    return [
      { title: aboutT.eduTitle, highlight: aboutT.eduHighlight, subtext: aboutT.eduSubtext }
    ];
  });

  readonly achievementsList = computed(() => {
    const aboutT = this.translationService.t().about;
    return [
      { title: aboutT.achTitle, highlight: aboutT.achHighlight }
    ];
  });

  private readonly allSkills = computed(() => {
    const { skills, categories } = this.translationService.t().about;
    return [
      { category: categories.frontend, items: skills.frontend, type: 'frontend' },
      { category: categories.backend, items: skills.backend, type: 'backend' },
      { category: categories.infra, items: skills.infra, type: 'tools' },
      { category: categories.ai, items: skills.ai, type: 'tools' }
    ];
  });

  readonly activeFilter = signal<SkillFilter>('all');

  readonly filteredSkills = computed(() => {
    const filter = this.activeFilter();
    const skills = this.allSkills();
    return filter === 'all' ? skills : skills.filter(skill => skill.type === filter);
  });

  setFilter(filterType: SkillFilter) {
    this.activeFilter.set(filterType);
  }
}
