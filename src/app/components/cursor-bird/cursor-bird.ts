import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cursor-bird',
  standalone: true,
  template: `
    <div class="cursor-bird" #bird aria-hidden="true">
      <svg viewBox="0 0 84 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Forked swallow tail -->
        <path class="bird-tail" d="M22 30 L4 18 L24 28 L4 42 Z" fill="currentColor" opacity="0.85"/>

        <!-- Body — aerodynamic teardrop -->
        <path d="M22 27 Q40 16 60 21 Q68 23 66 30 Q64 37 56 38 Q38 40 22 33 Z" fill="currentColor"/>

        <!-- Head -->
        <circle cx="63" cy="24" r="9" fill="currentColor"/>

        <!-- Beak -->
        <path d="M71 21 L84 25 L71 29 Z" fill="currentColor"/>

        <!-- Eye -->
        <circle cx="66" cy="22" r="3" fill="#0f172a"/>
        <circle cx="67" cy="21" r="1.2" fill="white" opacity="0.9"/>

        <!-- Upper wing (front, closer to viewer) -->
        <path class="bird-wing bird-wing--front"
              d="M57 23 C48 7, 26 3, 18 15 C30 13, 46 18, 57 23Z"
              fill="currentColor"/>

        <!-- Lower wing (back, farther from viewer) -->
        <path class="bird-wing bird-wing--back"
              d="M54 35 C44 50, 22 50, 16 40 C28 40, 44 35, 54 35Z"
              fill="currentColor" opacity="0.55"/>
      </svg>
    </div>
  `,
  styles: [`
    .cursor-bird {
      position: fixed;
      width: 42px;
      height: 30px;
      pointer-events: none;
      z-index: 9997;
      color: #6ee7b7;
      filter: drop-shadow(0 0 7px rgba(110, 231, 183, 0.45));
      transform: translate(-50%, -50%);
      will-change: left, top, transform;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .cursor-bird.visible { opacity: 1; }

    .cursor-bird svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }

    /* ── Wing pivots at body attachment ── */
    .bird-wing--front {
      transform-box: fill-box;
      transform-origin: 100% 100%;
    }

    .bird-wing--back {
      transform-box: fill-box;
      transform-origin: 100% 0%;
    }

    /* ── Flapping ── */
    .cursor-bird.flapping .bird-wing--front {
      animation: wing-front var(--flap-dur, 0.18s) ease-in-out infinite;
    }

    .cursor-bird.flapping .bird-wing--back {
      animation: wing-back var(--flap-dur, 0.18s) ease-in-out infinite;
      animation-delay: calc(var(--flap-dur, 0.18s) * -0.12);
    }

    /* Body bobs gently when flapping */
    .cursor-bird.flapping svg {
      animation: body-bob var(--flap-dur, 0.18s) ease-in-out infinite;
    }

    @keyframes wing-front {
      0%, 100% { transform: rotate(0deg) scaleY(1); }
      45%       { transform: rotate(-44deg) scaleY(0.5); }
    }

    @keyframes wing-back {
      0%, 100% { transform: rotate(0deg) scaleY(1); }
      45%       { transform: rotate(38deg) scaleY(0.55); }
    }

    @keyframes body-bob {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-1.5px); }
    }

    /* Tail fans on sharp turns — applied via JS class */
    .cursor-bird.turning .bird-tail {
      animation: tail-fan 0.3s ease-out forwards;
    }

    @keyframes tail-fan {
      0%   { transform: scaleX(1); }
      50%  { transform: scaleX(1.25) scaleY(1.15); }
      100% { transform: scaleX(1); }
    }

    @media (max-width: 768px), (pointer: coarse) {
      .cursor-bird { display: none; }
    }
  `]
})
export class CursorBirdComponent implements OnInit, OnDestroy {
  @ViewChild('bird', { static: true }) birdRef!: ElementRef<HTMLElement>;

  private birdX    = 0;
  private birdY    = 0;
  private targetX  = 0;
  private targetY  = 0;
  private prevX    = 0;
  private prevY    = 0;
  private angle    = 0;
  private facingLeft  = false;
  private hasMoved    = false;
  private moveActivity = 0;
  private rafId       = 0;
  private prevAngle   = 0;
  private turnTimer   = 0;
  private unlistenMove!: () => void;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // No-op on touch / coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.unlistenMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
      this.moveActivity = 20;
      if (!this.hasMoved) {
        this.birdX  = e.clientX;
        this.birdY  = e.clientY;
        this.prevX  = e.clientX;
        this.prevY  = e.clientY;
        this.hasMoved = true;
        this.birdRef.nativeElement.classList.add('visible');
      }
    });

    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = () => {
    const ease = 0.085;
    const dx = this.targetX - this.birdX;
    const dy = this.targetY - this.birdY;

    this.birdX += dx * ease;
    this.birdY += dy * ease;

    const vx = this.birdX - this.prevX;
    const vy = this.birdY - this.prevY;
    const velocity = Math.hypot(vx, vy);

    if (velocity > 0.3) {
      const newAngle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Detect sharp turn — fan the tail briefly
      const angleDelta = Math.abs(newAngle - this.prevAngle);
      if (angleDelta > 30 && angleDelta < 330 && this.turnTimer <= 0) {
        const el = this.birdRef.nativeElement;
        el.classList.add('turning');
        this.turnTimer = 18;
        setTimeout(() => el.classList.remove('turning'), 300);
      }
      this.prevAngle = newAngle;
      this.angle = newAngle;
      this.facingLeft = vx < 0;
    }

    if (this.moveActivity > 0) this.moveActivity--;
    if (this.turnTimer  > 0) this.turnTimer--;

    const isFlapping  = this.moveActivity > 0 || velocity > 0.1;
    const flapSpeed   = Math.max(0, Math.min(1, velocity * 0.4));
    const flapDurSec  = (0.22 - flapSpeed * 0.10).toFixed(3);

    this.prevX = this.birdX;
    this.prevY = this.birdY;

    const el   = this.birdRef.nativeElement;
    const tilt = Math.max(-14, Math.min(14, vy * 0.45));
    const flip = this.facingLeft ? ' scaleX(-1)' : '';

    el.classList.toggle('flapping', isFlapping);
    el.style.setProperty('--flap-dur', `${flapDurSec}s`);
    el.style.left      = `${this.birdX}px`;
    el.style.top       = `${this.birdY}px`;
    el.style.transform = `translate(-50%, -50%) rotate(${this.angle + tilt}deg)${flip}`;

    // Scroll page when bird enters top/bottom 28% of viewport
    if (this.hasMoved) {
      const vh   = window.innerHeight;
      const zone = vh * 0.28;
      if (this.birdY < zone) {
        const strength = (zone - this.birdY) / zone;
        window.scrollBy(0, -(strength * strength * 32));
      } else if (this.birdY > vh - zone) {
        const strength = (this.birdY - (vh - zone)) / zone;
        window.scrollBy(0, strength * strength * 32);
      }
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    if (this.unlistenMove) this.unlistenMove();
  }
}
