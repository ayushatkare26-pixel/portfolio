import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { CertificationsComponent } from './components/certifications/certifications';
import { EducationComponent } from './components/education/education';
import { StatsComponent } from './components/stats/stats';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress';
import { CursorGlowComponent } from './components/cursor-glow/cursor-glow';
import { CursorBirdComponent } from './components/cursor-bird/cursor-bird';
import { BackToTopComponent } from './components/back-to-top/back-to-top';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ScrollProgressComponent,
    CursorGlowComponent,
    CursorBirdComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    StatsComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    CertificationsComponent,
    ContactComponent,
    FooterComponent,
    BackToTopComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}
