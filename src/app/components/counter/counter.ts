import { Component, Input, OnInit, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `<span>{{ displayed() }}{{ suffix }}</span>`,
})
export class CounterComponent implements OnInit {
  @Input() target = 0;
  @Input() suffix = '';
  @Input() duration = 1800;

  displayed = signal('0');

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(this.el.nativeElement);
  }

  private animate() {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / this.duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * this.target);
      this.displayed.set(current.toString());
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
