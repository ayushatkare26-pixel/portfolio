import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealDirection: 'up' | 'left' | 'right' | 'fade' = 'up';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const el = this.el.nativeElement as HTMLElement;

    // Set initial hidden state
    el.style.opacity = '0';
    el.style.transition = `opacity 0.7s ease ${this.revealDelay}ms, transform 0.7s ease ${this.revealDelay}ms`;

    switch (this.revealDirection) {
      case 'up':    el.style.transform = 'translateY(40px)'; break;
      case 'left':  el.style.transform = 'translateX(-40px)'; break;
      case 'right': el.style.transform = 'translateX(40px)'; break;
      case 'fade':  el.style.transform = 'none'; break;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
