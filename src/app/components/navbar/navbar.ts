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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled = window.scrollY > 50;
  }
}
