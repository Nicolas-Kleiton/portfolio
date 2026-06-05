import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly translationService = inject(TranslationService);

  get roles(): string[] {
    return this.translationService.t().hero.roles;
  }

  get t() {
    return this.translationService.t();
  }
  
  // Typewriter effect state variables
  displayText: string = '';
  currentRoleIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 150;

  private boundMouseMove = this.onMouseMove.bind(this);

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone 
  ) {}

  ngOnInit() {
    this.zone.run(() => {
      this.handleTyping();
    });

    // Run mouse listener outside Angular to prevent global change detection on every pixel moved!
    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.boundMouseMove);
    });
  }

  handleTyping() {
    this.zone.run(() => {
      const currentFullText = this.roles[this.currentRoleIndex];

      if (this.isDeleting) {
        this.displayText = currentFullText.substring(0, this.displayText.length - 1);
        this.typingSpeed = 50; 
      } else {
        this.displayText = currentFullText.substring(0, this.displayText.length + 1);
        this.typingSpeed = 150;
      }

      if (!this.isDeleting && this.displayText === currentFullText) {
        this.typingSpeed = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.displayText === '') {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.typingSpeed = 500;
      }

      this.cdr.detectChanges();
      setTimeout(() => this.handleTyping(), this.typingSpeed);
    });
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.boundMouseMove);
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (!document.hidden) {
      this.zone.run(() => {
        this.cdr.detectChanges();
      });
    }
  }

  // Vanilla DOM update for performance (avoids Angular Change Detection lag)
  onMouseMove(e: MouseEvent) {
    const glow = document.querySelector('.mouse-glow') as HTMLElement;
    if (glow) {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }
  }
}
