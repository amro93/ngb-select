import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbSelectComponent } from '../../lib/ngb-select.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbSelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .hero-banner {
        background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 50%, #6610f2 100%);
        color: white;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(13, 110, 253, 0.15);
      }

      .badge-feature {
        font-weight: 500;
        font-size: 0.8rem;
        padding: 0.4rem 0.75rem;
        border-radius: 2rem;
      }
    `,
  ],
  template: `
    <section class="hero-banner p-4 p-md-5 mb-4 text-center text-md-start">
      <div class="row align-items-center g-4">
        <div class="col-md-8">
          <div class="d-flex flex-wrap gap-2 mb-3 justify-content-center justify-content-md-start">
            <span class="badge bg-white text-primary badge-feature"
              ><i class="bi bi-bootstrap-fill me-1"></i> Pure Bootstrap 5</span
            >
            <span class="badge bg-white text-primary badge-feature"
              ><i class="bi bi-check-all me-1"></i> Multi-Select & Chips</span
            >
            <span class="badge bg-white text-primary badge-feature"
              ><i class="bi bi-code-square me-1"></i> Standalone Component</span
            >
            <span class="badge bg-white text-primary badge-feature"
              ><i class="bi bi-lightning-fill me-1"></i> Signals Ready</span
            >
          </div>
          <h1 class="display-5 fw-bold mb-3">Angular Select Component</h1>
          <p class="lead opacity-90 mb-4">
            A high-performance, robust Angular Standalone select and multi-select dropdown component
            styled strictly with <strong>pure Bootstrap 5 CSS classes</strong>. Zero external UI
            library dependencies.
          </p>
          <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
            <a href="#examples" class="btn btn-light btn-lg fw-semibold text-primary shadow-sm">
              <i class="bi bi-play-circle-fill me-1"></i> Explore Examples
            </a>
            <a href="#api-reference" class="btn btn-outline-light btn-lg fw-semibold">
              <i class="bi bi-journal-code me-1"></i> API Reference
            </a>
          </div>
        </div>
        <div class="col-md-4 d-none d-md-block text-center">
          <div class="bg-white p-4 rounded-4 shadow-lg text-dark text-start">
            <label class="form-label text-muted small fw-bold mb-1"
              >Live Multi-Select Preview</label
            >
            <ngb-select
              [options]="countries"
              [ngModel]="selectedCountries"
              (ngModelChange)="selectedCountriesChange.emit($event)"
              optionLabel="name"
              [multiple]="true"
              display="chip"
              [filter]="true"
              [showSelectAll]="true"
              [showClear]="true"
              placeholder="Select countries..."
              [fluid]="true"
            >
            </ngb-select>
            <div class="mt-3 p-2 bg-light rounded small text-muted">
              <i class="bi bi-info-circle me-1 text-primary"></i> Selected ({{
                selectedCountries.length
              }}
              items)
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  @Input() countries: any[] = [];
  @Input() selectedCountries: any[] = [];
  @Output() selectedCountriesChange = new EventEmitter<any[]>();
}
