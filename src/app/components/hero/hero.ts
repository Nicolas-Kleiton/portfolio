import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, inject, signal, viewChild } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly translationService = inject(TranslationService);

  get t() {
    return this.translationService.t();
  }

  private readonly glow = viewChild.required<ElementRef<HTMLElement>>('glow');

  // Typewriter effect state
  readonly displayText = signal('');
  private currentRoleIndex = 0;
  private isDeleting = false;
  private typingTimer?: ReturnType<typeof setTimeout>;

  // Updates the DOM directly, outside change detection
  private readonly onMouseMove = (e: MouseEvent) => {
    const glow = this.glow().nativeElement;
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  };

  // Shows the first role statically, without the typewriter
  readonly reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  ngOnInit() {
    if (!this.reduceMotion) {
      this.handleTyping();
    }
  }

  ngAfterViewInit() {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
  }

  ngOnDestroy() {
    clearTimeout(this.typingTimer);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  private handleTyping() {
    const roles = this.t.hero.roles;
    const currentFullText = roles[this.currentRoleIndex % roles.length];
    const current = this.displayText();
    let delay: number;

    if (this.isDeleting) {
      this.displayText.set(currentFullText.substring(0, current.length - 1));
      delay = 50;
    } else {
      this.displayText.set(currentFullText.substring(0, current.length + 1));
      delay = 150;
    }

    const next = this.displayText();
    if (!this.isDeleting && next === currentFullText) {
      this.isDeleting = true;
      delay = 2000;
    } else if (this.isDeleting && next === '') {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % roles.length;
      delay = 500;
    }

    this.typingTimer = setTimeout(() => this.handleTyping(), delay);
  }
}
