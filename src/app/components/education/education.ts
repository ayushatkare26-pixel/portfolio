import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent {
  degrees = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Savitribai Phule Pune University',
      years: '2023 – 2025',
      icon: '🎓',
      color: '#6ee7b7',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Rashtrasant Tukadoji Maharaj Nagpur University',
      years: '2020 – 2023',
      icon: '📚',
      color: '#38bdf8',
    },
  ];
}
