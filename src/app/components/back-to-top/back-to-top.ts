import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button class="btt-btn" (click)="scrollTop()" aria-label="Back to top">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    }
  `,
  styles: [`
    .btt-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 900;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(110, 231, 183, 0.3);
      background: rgba(10, 10, 15, 0.85);
      backdrop-filter: blur(10px);
      color: #6ee7b7;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.2s;
      animation: btt-in 0.2s ease-out;
    }

    .btt-btn:hover {
      border-color: #6ee7b7;
      background: rgba(110, 231, 183, 0.1);
      transform: translateY(-2px);
    }

    .btt-btn:focus-visible {
      outline: 2px solid #6ee7b7;
      outline-offset: 3px;
    }

    @keyframes btt-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 640px) {
      .btt-btn { bottom: 1.25rem; right: 1.25rem; width: 38px; height: 38px; }
    }
  `]
})
export class BackToTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > 420);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
