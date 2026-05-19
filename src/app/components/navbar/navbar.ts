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
    { label: 'Home', path: '#home'},
    { label: 'About Me', path: '#about'},
    { label: 'Projects', path: '#projects'},
    { label: 'Contact', path: '#contact'},
  ];

  isMenuOpen = false;
  isScrolled = false;
  isContactSection = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled = window.scrollY > 50;

    // Detect if scrolled into the contact section for light theme
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const rect = contactEl.getBoundingClientRect();
      this.isContactSection = rect.top <= 80;
    }
  }
}
