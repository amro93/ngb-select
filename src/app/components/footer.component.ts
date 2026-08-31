import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="mt-5 text-center text-muted small border-top pt-4">
      <div class="d-flex justify-content-center gap-3 mb-2">
        <a href="https://github.com/amro93/ngb-select" class="text-decoration-none text-muted"
          >GitHub Repository</a
        >
        <span>&bull;</span>
        <a
          href="https://stackblitz.com/github/amro93/ngb-select"
          class="text-decoration-none text-muted"
          >StackBlitz Demo</a
        >
        <span>&bull;</span>
        <a href="https://opensource.org/licenses/MIT" class="text-decoration-none text-muted"
          >MIT License</a
        >
      </div>
      <p class="mb-0">
        Designed & built with <strong>Angular Standalone</strong> &
        <strong>Bootstrap 5</strong> &bull; v{{ appVersion }}
      </p>
    </footer>
  `,
})
export class FooterComponent {
  @Input() appVersion = '';
}
