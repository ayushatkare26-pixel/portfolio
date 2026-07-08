import { Component } from '@angular/core';
import { CounterComponent } from '../counter/counter';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CounterComponent, RevealDirective],
  templateUrl: './stats.html',
  styleUrl: './stats.scss'
})
export class StatsComponent {
  stats = [
    { target: 5,   suffix: '',   label: 'Companies Worked At',    icon: '🏢', desc: 'Actin Technologies, Algorithm Cat, Deltavix Global, Qualitas Global & more' },
    { target: 9,   suffix: ' mo',label: 'At Actin Technologies',  icon: '📅', desc: '4 months intern + 5 months full-time Software Engineer (Jan 2026–Present)' },
    { target: 7,   suffix: '+',  label: 'Certifications Earned',  icon: '🎓', desc: 'Udemy, Forage, IIT Bombay, Agile Scrum Foundation & more' },
    { target: 15,  suffix: '+',  label: 'Technologies Mastered',  icon: '🛠️', desc: 'Angular, .NET 8, SQL Server, Java, Python, AWS, GenAI and more' },
    { target: 4,   suffix: '+',  label: 'Production Systems',     icon: '🏭', desc: 'SCADA dashboards, Store Automation, Scholarship Portal, REST API platforms' },
    { target: 20,  suffix: '+',  label: 'REST APIs Designed',      icon: '🔌', desc: 'Endpoints built across SCADA, Store Operations, Scholarship Portal, and Udemy API projects' },
  ];
}
