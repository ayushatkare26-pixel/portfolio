import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss'
})
export class CertificationsComponent {
  certs = [
    {
      title: 'Build ASP.NET Core Web API – Scratch to Finish (.NET 8)',
      platform: 'Udemy',
      instructor: 'Sameer Saini',
      date: 'Oct 2025',
      icon: '⚙️',
      color: '#6ee7b7',
      category: 'Backend',
    },
    {
      title: 'Agile Scrum Foundation Certification',
      platform: 'Professional Certification',
      instructor: null,
      date: '2024',
      icon: '🔄',
      color: '#38bdf8',
      category: 'Methodology',
    },
    {
      title: 'Accenture UK Developer & Technology Job Simulation',
      platform: 'Forage',
      instructor: 'Accenture UK',
      date: '2024',
      icon: '💼',
      color: '#a78bfa',
      category: 'Industry Sim',
    },
    {
      title: 'AWS APAC Solutions Architecture Job Simulation',
      platform: 'Forage',
      instructor: 'AWS APAC',
      date: '2024',
      icon: '☁️',
      color: '#fbbf24',
      category: 'Cloud',
    },
    {
      title: 'Tata Data Visualisation: Empowering Business with Effective Insights',
      platform: 'Forage',
      instructor: 'Tata Consultancy Services',
      date: 'Jan 2025',
      icon: '📊',
      color: '#f472b6',
      category: 'Data',
    },
    {
      title: 'Python 3.4.3 Programming Training',
      platform: 'Spoken Tutorial Project, IIT Bombay',
      instructor: 'Sinhgad Institute of Management',
      date: '2024',
      icon: '🐍',
      color: '#6ee7b7',
      category: 'Programming',
    },
    {
      title: 'R Programming Training (Score: 87.50%)',
      platform: 'Spoken Tutorial Project, IIT Bombay',
      instructor: null,
      date: '2024',
      icon: '📈',
      color: '#38bdf8',
      category: 'Data',
    },
  ];

  activeFilter = 'All';
  filters = ['All', 'Backend', 'Cloud', 'Data', 'Methodology', 'Programming', 'Industry Sim'];

  get filtered() {
    if (this.activeFilter === 'All') return this.certs;
    return this.certs.filter(c => c.category === this.activeFilter);
  }

  setFilter(f: string) { this.activeFilter = f; }
}
