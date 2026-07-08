import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  activeFilter = signal('All');
  filters = ['All', 'Frontend', 'Backend', 'Full-Stack'];

  projects = [
    {
      title: 'Industrial SCADA Monitoring System',
      category: 'Full-Stack',
      description: 'Enterprise-level industrial monitoring application with real-time dashboards, SVG synoptic diagrams, alarm management, and batch control for production environments at Actin Technologies.',
      features: ['Real-time monitoring dashboards', 'SVG-based synoptic diagrams', 'Alarm monitoring & management', 'Batch management workflows', 'Dynamic search, filter & pagination'],
      tech: ['Angular', 'ASP.NET Core 8', 'SQL Server', 'SCSS', 'SVG', 'REST API'],
      color: '#6ee7b7',
      icon: '🏭',
      featured: true,
      label: 'Production · Actin Technologies',
      githubUrl: null,
      isPrivate: true,
    },
    {
      title: 'Web-based Store Operations Automation System',
      category: 'Full-Stack',
      description: 'Real-world store operations platform built during internship at Actin Technologies. Handles end-to-end store workflows, automation, and business process management at scale.',
      features: ['Store workflow automation', 'Business process management', 'Scalable application architecture', 'Full-stack .NET + Angular stack', 'Real-world data integration'],
      tech: ['ASP.NET Core', 'Angular', 'SQL Server', 'REST API', 'TypeScript'],
      color: '#a78bfa',
      icon: '🏪',
      featured: false,
      label: 'Internship Project · Actin Technologies',
      githubUrl: null,
      isPrivate: true,
    },
    {
      title: 'ASP.NET Core 8 Web API Platform',
      category: 'Backend',
      description: 'Production-ready RESTful backend API with full CRUD, JWT authentication, Swagger docs, and Entity Framework Core — built as part of the Udemy certified .NET 8 course.',
      features: ['JWT Authentication & Authorization', 'Swagger / OpenAPI documentation', 'Entity Framework Core integration', 'Clean API architecture & validation', 'Error handling & logging'],
      tech: ['ASP.NET Core 8', 'Entity Framework Core', 'SQL Server', 'JWT', 'Swagger'],
      color: '#38bdf8',
      icon: '⚙️',
      featured: false,
      label: 'Certification Project · Udemy',
      githubUrl: null,
      isPrivate: false,
    },
    {
      title: 'Angular Enterprise Dashboard',
      category: 'Frontend',
      description: 'Responsive Angular dashboard with dynamic data tables, filtering, pagination, reusable component library, and a modern enterprise UI design system.',
      features: ['Dynamic data tables & charts', 'Advanced search & pagination', 'Reusable Angular component library', 'Fully responsive layout', 'Angular Material + custom SCSS'],
      tech: ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Angular Material'],
      color: '#f472b6',
      icon: '📊',
      featured: false,
      label: 'Personal Project',
      githubUrl: null,
      isPrivate: false,
    },
  ];

  get filteredProjects() {
    const f = this.activeFilter();
    if (f === 'All') return this.projects;
    return this.projects.filter(p => p.category === f);
  }

  setFilter(f: string) { this.activeFilter.set(f); }
}
