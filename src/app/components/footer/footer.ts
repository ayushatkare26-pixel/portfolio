import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-brand">
          <span style="color:var(--accent)">&lt;</span>Ayush<span style="color:var(--accent-2)">.</span>dev<span style="color:var(--accent)">/&gt;</span>
        </p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/in/ayush-atkare" target="_blank" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/ayushatkare" target="_blank" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <a href="mailto:ayushatkare1@gmail.com" aria-label="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
        <p class="footer-copy">Built with Angular · Designed & coded by Ayush Atkare · {{ year }}</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer { border-top: 1px solid var(--border); padding: 2rem; }
    .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
    .footer-brand { font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); }
    .footer-copy { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
    .footer-social { display: flex; gap: 1rem; align-items: center; }
    .footer-social a { color: var(--text-muted); transition: color 0.2s; display: flex; }
    .footer-social a:hover { color: var(--accent); }
    .footer-social a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
