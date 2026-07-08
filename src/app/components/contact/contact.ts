import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  // Go to formspree.io → sign up → New Form → copy the ID and replace YOUR_FORM_ID below
  private FORMSPREE_URL = 'https://formspree.io/f/xeebleqk';

  contactForm: FormGroup;
  submitted  = signal(false);
  submitting = signal(false);
  submitError = signal(false);
  copied     = signal(false);

  email = 'ayushatkare1@gmail.com';

  contactLinks = [
    { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/ayush-atkare', href: 'https://www.linkedin.com/in/ayush-atkare' },
    { icon: 'github',   label: 'GitHub',   value: 'github.com/ayushatkare',       href: 'https://github.com/ayushatkare' },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get nameCtrl()    { return this.contactForm.get('name')!; }
  get emailCtrl()   { return this.contactForm.get('email')!; }
  get messageCtrl() { return this.contactForm.get('message')!; }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.submitError.set(false);

    this.http.post(this.FORMSPREE_URL, this.contactForm.value).subscribe({
      next: () => {
        this.submitted.set(true);
        this.submitting.set(false);
        this.contactForm.reset();
      },
      error: () => {
        this.submitError.set(true);
        this.submitting.set(false);
      },
    });
  }

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
