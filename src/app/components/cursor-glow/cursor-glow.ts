import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cursor-glow',
  standalone: true,
  template: `
    <div class="cursor-dot" #dot></div>
    <div class="cursor-glow" #glow></div>
  `,
  styles: [`
    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background: #6ee7b7;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: transform 0.1s, opacity 0.2s;
      mix-blend-mode: screen;
    }
    .cursor-glow {
      position: fixed;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(110,231,183,0.055) 0%, transparent 70%);
      transition: left 0.08s ease, top 0.08s ease;
    }
    @media (max-width: 768px) {
      .cursor-dot, .cursor-glow { display: none; }
    }
  `]
})
export class CursorGlowComponent implements OnInit, OnDestroy {
  private unlisten!: () => void;
  private dot!: HTMLElement;
  private glow!: HTMLElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.dot = document.querySelector('.cursor-dot') as HTMLElement;
    this.glow = document.querySelector('.cursor-glow') as HTMLElement;

    this.unlisten = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      if (this.dot) {
        this.dot.style.left = e.clientX + 'px';
        this.dot.style.top = e.clientY + 'px';
      }
      if (this.glow) {
        this.glow.style.left = e.clientX + 'px';
        this.glow.style.top = e.clientY + 'px';
      }
    });

    // Grow dot on clickable elements
    this.renderer.listen('document', 'mouseover', (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches('a, button, [class*="card"], [class*="btn"], [class*="tab"], [class*="pill"]')) {
        if (this.dot) this.dot.style.transform = 'translate(-50%, -50%) scale(2.5)';
      }
    });
    this.renderer.listen('document', 'mouseout', () => {
      if (this.dot) this.dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  ngOnDestroy() {
    if (this.unlisten) this.unlisten();
  }
}
