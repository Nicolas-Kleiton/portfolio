import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})

export class Navbar {
  navLinks = [
    { label: 'Home', path: 'home'},
    { label: 'About Me', path: 'about'},
    { label: 'Projects', path: 'projects'},
    { label: 'Contact', path: 'contact'},
  ];

  isMenuOpen = false;
  isScrolled = false;
  isContactSection = false;
  activeSection: string = 'home';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(event: Event, path: string) {
    event.preventDefault(); 
    this.activeSection = path;
    const element = document.getElementById(path);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after clicking
    this.isMenuOpen = false; 
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
