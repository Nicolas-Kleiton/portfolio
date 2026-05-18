import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  // Data models for dynamic rendering
  educationList = [
    { title: 'EDUCATION', highlight: 'B.S. in Computer Science', subtext: 'UFPB (2024-2028)' }
  ];

  achievementsList = [
    { title: 'ACHIEVEMENTS', highlight: '🏆 2nd Place - Hackathon Trilhathon' }
  ];

  allSkills = [
    { category: 'Frontend', items: 'TypeScript, React, Angular, HTML/CSS', type: 'frontend' },
    { category: 'Backend & DB', items: 'C, Java, Python, FastAPI, MySQL, SQL Server', type: 'backend' },
    { category: 'Infrastructure', items: 'Docker, Git, Clean Architecture', type: 'tools' },
    { category: 'Artificial Intelligence', items: 'LLM Integration (OpenAI), Prompt Engineering', type: 'tools' }
  ];

  // Current state for skill categorization
  activeFilter: string = 'all';

  // Getter to dynamically filter skills based on state
  get filteredSkills() {
    if (this.activeFilter === 'all') {
      return this.allSkills;
    }
    return this.allSkills.filter(skill => skill.type === this.activeFilter);
  }

  // Updates the filter state when a tab is clicked
  setFilter(filterType: string) {
    this.activeFilter = filterType;
  }
}
