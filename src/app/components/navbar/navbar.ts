import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})

export class Navbar implements OnDestroy {
  readonly translationService = inject(TranslationService);

  get navLinks() {
    const t = this.translationService.t().navbar;
    return [
      { label: t.home, path: 'home'},
      { label: t.about, path: 'about'},
      { label: t.projects, path: 'projects'},
      { label: t.contact, path: 'contact'},
    ];
  }

  isMenuOpen = false;
  isScrolled = false;
  isContactSection = false;
  activeSection: string = 'home';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  private updateBodyScroll() {
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  scrollToSection(event: Event, path: string) {
    event.preventDefault(); 
    this.activeSection = path;
    const element = document.getElementById(path);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after clicking
    this.closeMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    // Change navbar background on scroll
    this.isScrolled = window.scrollY > 50;

    // Detect active section for scroll spy
    const sections = ['home', 'about', 'projects', 'contact'];
    let currentSection = 'home';
    
    // Visual offset so it activates slightly before reaching the top
    const scrollPosition = window.scrollY + 150; 

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        if (scrollPosition >= element.offsetTop) {
          currentSection = section;
        }
      }
    }
    
    this.activeSection = currentSection;
    
    // Toggle light theme if in contact section
    this.isContactSection = currentSection === 'contact';
  }
}
