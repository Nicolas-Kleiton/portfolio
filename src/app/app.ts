import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { About } from './components/about/about';
import { FeaturedProject } from './components/featured-project/featured-project';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Navbar, HeroComponent, About, FeaturedProject, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
