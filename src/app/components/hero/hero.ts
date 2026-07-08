import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  displayedText = signal('');
  cursorVisible = signal(true);

  heroStats = [
    { value: '5',   label: 'Companies' },
    { value: '9mo', label: 'At Actin' },
    { value: '7+',  label: 'Certs' },
    { value: '15+', label: 'Tech Stack' },
  ];

  private titles = [
    'Full-Stack Developer',
    'ASP.NET Core 8 Expert',
    'Angular Architect',
    'AI-Driven Builder',
    'Enterprise App Dev',
  ];
  private titleIdx = 0;
  private charIdx = 0;
  private interval: any;
  private cursorInterval: any;

  ngOnInit() {
    this.startTyping();
    this.cursorInterval = setInterval(() => this.cursorVisible.update(v => !v), 530);
  }

  private startTyping() {
    this.interval = setInterval(() => {
      const current = this.titles[this.titleIdx];
      if (this.charIdx < current.length) {
        this.displayedText.set(current.slice(0, ++this.charIdx));
      } else {
        clearInterval(this.interval);
        setTimeout(() => this.startErasing(), 1800);
      }
    }, 80);
  }

  private startErasing() {
    this.interval = setInterval(() => {
      if (this.charIdx > 0) {
        this.displayedText.set(this.titles[this.titleIdx].slice(0, --this.charIdx));
      } else {
        this.titleIdx = (this.titleIdx + 1) % this.titles.length;
        clearInterval(this.interval);
        setTimeout(() => this.startTyping(), 400);
      }
    }, 45);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.cursorInterval);
  }

  scrollToContact() { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }
  scrollToProjects() { document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }
}
