import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `
    <div class="scroll-progress-track">
      <div class="scroll-progress-bar" [style.width.%]="progress()"></div>
    </div>
  `,
  styles: [`
    .scroll-progress-track {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255,255,255,0.04);
      z-index: 9999;
    }
    .scroll-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #6ee7b7, #38bdf8, #a78bfa);
      transition: width 0.1s linear;
      box-shadow: 0 0 8px rgba(110,231,183,0.6);
    }
  `]
})
export class ScrollProgressComponent {
  progress = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    const el = document.documentElement;
    const scrolled = el.scrollTop || document.body.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    this.progress.set(total > 0 ? Math.round((scrolled / total) * 100) : 0);
  }
}
