import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="quick-nav-sidebar sticky-top" style="top: 4.5rem; z-index: 1020">
      <!-- Mobile/Tablet Toggle Button (< 992px) -->
      <div class="d-lg-none mb-3">
        <button
          class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between py-2 shadow-sm"
          (click)="isNavCollapsed = !isNavCollapsed"
        >
          <span class="fw-semibold"
            ><i class="bi bi-list me-2 fs-5"></i>Quick Navigation (28 Demos)</span
          >
          <i
            class="bi"
            [class.bi-chevron-down]="isNavCollapsed"
            [class.bi-chevron-up]="!isNavCollapsed"
          ></i>
        </button>
      </div>

      <!-- Vertical Sidebar Card -->
      <div
        class="card shadow-sm border"
        [class.d-none]="isNavCollapsed"
        [class.d-lg-block]="true"
      >
        <div
          class="card-header bg-body py-2 px-3 fw-bold text-primary d-flex align-items-center justify-content-between"
        >
          <span><i class="bi bi-compass me-1"></i> Showcase Navigation</span>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle"
            >28 Demos</span
          >
        </div>
        <div class="card-body p-2" style="max-height: calc(100vh - 8rem); overflow-y: auto">
          <nav class="nav flex-column quick-nav-vertical-pills">
            <a class="nav-link py-2 px-3 rounded-2" href="#basic" (click)="isNavCollapsed = true"
              ><i class="bi bi-check-circle-fill text-primary me-2"></i>1. Basic Single</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#multi-select"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-check-all text-success me-2"></i>2. Multi-Select & Chips</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#select-all"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-ui-checks-grid text-primary me-2"></i>3. Select All</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#trigger-search"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-search text-warning me-2"></i>4. In-Trigger Search</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#searchable-multi"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-filter-square-fill text-info me-2"></i>5. Searchable
              Multi-Select</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#focus-open"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-bullseye text-danger me-2"></i>6. Focus on Open</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#reactive-forms"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-ui-radios text-info me-2"></i>7. Reactive Forms</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#filtering"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-funnel text-primary me-2"></i>8. Search & Filtering</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#templates"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-palette text-warning me-2"></i>9. Custom Templates</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#grouping"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-folder2-open text-danger me-2"></i>10. Grouped Options</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#editable"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-pencil-square text-secondary me-2"></i>11. Editable Combobox</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#float-label"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-textarea-resize text-info me-2"></i>12. Floating Labels</a
            >
            <a class="nav-link py-2 px-3 rounded-2" href="#sizes" (click)="isNavCollapsed = true"
              ><i class="bi bi-bounding-box text-success me-2"></i>13. Sizes & Variants</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#loading"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-arrow-repeat text-secondary me-2"></i>14. Loading State</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#virtual-scroll"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-list-ol text-warning me-2"></i>15. Large Dataset</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#signals"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-lightning-charge-fill text-warning me-2"></i>16. Modern Signals</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#arabic-showcase"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-translate text-success me-2"></i>17. Arabic (AR) RTL</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#cascading"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-diagram-3-fill text-primary me-2"></i>18. Cascading Selects</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#async-search"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-cloud-arrow-down-fill text-info me-2"></i>19. Async Search</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#custom-icons"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-stars text-warning me-2"></i>20. Custom Icons</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#table-edit"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-table text-success me-2"></i>21. Table Inline Edit</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#modal-dialog"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-window-stack text-secondary me-2"></i>22. Modal Integration</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#custom-chip-user"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-person-badge text-primary me-2"></i>23. Custom Chip Badges</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#dark-mode"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-moon-stars-fill text-dark me-2"></i>24. Dark Mode Theme</a
            >
            <a class="nav-link py-2 px-3 rounded-2" href="#a11y" (click)="isNavCollapsed = true"
              ><i class="bi bi-universal-access text-info me-2"></i>25. Accessibility (A11y)</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#form-reset"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-arrow-counterclockwise text-danger me-2"></i>26. Form Reset &
              Disable</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#grouped-multi"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-layers-fill text-primary me-2"></i>27. Grouped Multi-Select</a
            >
            <a
              class="nav-link py-2 px-3 rounded-2"
              href="#mobile-modal"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-phone text-success me-2"></i>28. Mobile Modal & Modal-in-Modal</a
            >
            <div class="dropdown-divider my-2"></div>
            <a
              class="nav-link py-2 px-3 rounded-2 active-pill text-white bg-primary fw-bold"
              href="#api-reference"
              (click)="isNavCollapsed = true"
              ><i class="bi bi-journal-code me-2"></i>API Reference</a
            >
          </nav>
        </div>
      </div>
    </div>
  `,
})
export class SidebarNavComponent {
  isNavCollapsed = false;
}
