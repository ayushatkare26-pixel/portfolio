import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  activeCategory = signal('Frontend');

  allTech = [
    'Angular', 'TypeScript', 'RxJS', 'SCSS', 'HTML5', 'Bootstrap', 'Angular Material',
    'ASP.NET Core', 'C#', 'Entity Framework Core', 'REST API', 'JWT', 'LINQ', 'Dependency Injection',
    'SQL Server', 'Stored Procedures', 'Git', 'GitHub', 'Visual Studio', 'VS Code',
    'Swagger', 'Postman', 'npm', 'Angular CLI', 'Clean Architecture', 'SVG'
  ];

  categories = [
    { name: 'Frontend', skills: [
      { name: 'Angular', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'RxJS', level: 78 },
      { name: 'SCSS / CSS3', level: 85 },
      { name: 'Angular Material', level: 82 },
      { name: 'Bootstrap', level: 80 },
    ]},
    { name: 'Backend', skills: [
      { name: 'ASP.NET Core', level: 85 },
      { name: 'C#', level: 83 },
      { name: 'Entity Framework Core', level: 80 },
      { name: 'REST API Design', level: 85 },
      { name: 'JWT Authentication', level: 78 },
      { name: 'LINQ', level: 80 },
    ]},
    { name: 'Database', skills: [
      { name: 'SQL Server', level: 82 },
      { name: 'Database Design', level: 78 },
      { name: 'Stored Procedures', level: 75 },
      { name: 'Query Optimization', level: 72 },
    ]},
    { name: 'Tools', skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Visual Studio', level: 90 },
      { name: 'VS Code', level: 90 },
      { name: 'Swagger / Postman', level: 82 },
      { name: 'Angular CLI', level: 85 },
    ]},
  ];

  get activeSkills() {
    return this.categories.find(c => c.name === this.activeCategory())?.skills ?? [];
  }

  setCategory(name: string) { this.activeCategory.set(name); }
}
