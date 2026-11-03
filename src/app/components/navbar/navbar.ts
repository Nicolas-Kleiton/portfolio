import { Component, DestroyRef, DOCUMENT, HostListener, OnDestroy, afterNextRender, computed, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

const SECTIONS = ['home', 'about', 'projects', 'contact'] as const;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  readonly translationService = inject(TranslationService);
  private readonly document = inject(DOCUMENT);

  readonly navLinks = computed(() => {
    const t = this.translationService.t().navbar;
    return [
      { label: t.home, path: 'home' },
      { label: t.about, path: 'about' },
      { label: t.projects, path: 'projects' },
      { label: t.contact, path: 'contact' },
    ];
  });

  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly activeSection = signal<string>('home');
  readonly isContactSection = computed(() => this.activeSection() === 'contact');

  // Passive listener instead of @HostListener: avoids change detection on every scroll
  private readonly onWindowScroll = () => {
    this.isScrolled.set(window.scrollY > 50);

    // Visual offset so the section activates slightly before reaching the top
    const scrollPosition = window.scrollY + 150;
    let currentSection: string = 'home';

    for (const section of SECTIONS) {
      const element = document.getElementById(section);
      if (element && scrollPosition >= element.offsetTop) {
        currentSection = section;
      }
    }

    this.activeSection.set(currentSection);
  };

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      window.addEventListener('scroll', this.onWindowScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', this.onWindowScroll));
    });
  }

  ngOnDestroy() {
    this.document.body.style.overflow = '';
  }

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
    this.updateBodyScroll();
  }

  closeMenu() {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
      this.updateBodyScroll();
    }
  }

  private updateBodyScroll() {
    this.document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  scrollToSection(event: Event, path: string) {
    event.preventDefault();
    this.activeSection.set(path);
    const element = document.getElementById(path);
    if (element) {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }
    this.closeMenu();
  }
}
