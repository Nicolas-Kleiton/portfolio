import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  
  roles: string[] = ['FULLSTACK DEVELOPER', 'SOFTWARE ENGINEER'];
  
  // Typewriter effect state variables
  displayText: string = '';
  currentRoleIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 150;

  // Mouse coordinates for background glow
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone 
  ) {}

  ngOnInit() {
    // Start the recursive typing loop within Angular's zone
    this.zone.run(() => {
      this.handleTyping();
    });
  }

  // Recursive function to handle the typing/deleting animation
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

      // Toggle states based on text completion
      if (!this.isDeleting && this.displayText === currentFullText) {
        this.typingSpeed = 2000; // Pause at completion
        this.isDeleting = true;
      } else if (this.isDeleting && this.displayText === '') {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.typingSpeed = 500;
      }

      // Explicitly trigger change detection for real-time UI updates
      this.cdr.detectChanges();

      setTimeout(() => this.handleTyping(), this.typingSpeed);
    }); // End of zone.run
  } // End of handleTyping

  ngOnDestroy() {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
}
