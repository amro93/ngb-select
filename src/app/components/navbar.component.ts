import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar navbar-expand-lg border-bottom sticky-top bg-body shadow-sm py-2">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary" href="#">
          <i class="bi bi-ui-checks-grid fs-4"></i>
          <span>ngb-select</span>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-7"
            >v{{ appVersion }}</span
          >
        </a>

        <div class="d-flex align-items-center gap-2">
          <!-- Dark/Light Theme Toggle -->
          <button
            class="btn btn-outline-secondary btn-sm"
            (click)="themeToggle.emit()"
            [title]="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <i class="bi" [class.bi-moon-stars-fill]="!isDarkMode" [class.bi-sun-fill]="isDarkMode"></i>
          </button>

          <!-- StackBlitz Live Edit -->
          <a
            href="https://stackblitz.com/github/amro93/ngb-select"
            target="_blank"
            class="btn btn-outline-primary btn-sm d-none d-sm-inline-flex align-items-center gap-1"
          >
            <i class="bi bi-lightning-charge-fill"></i> StackBlitz
          </a>

          <!-- GitHub Link -->
          <a
            href="https://github.com/amro93/ngb-select"
            target="_blank"
            class="btn btn-dark btn-sm d-inline-flex align-items-center gap-1"
          >
            <i class="bi bi-github"></i> GitHub
          </a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  @Input() appVersion = '';
  @Input() isDarkMode = false;
  @Output() themeToggle = new EventEmitter<void>();
}
