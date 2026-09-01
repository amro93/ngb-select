import { Component, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbSelectComponent } from '../../../lib/ngb-select.component';
import { ExampleCardComponent } from '../example-card.component';
import { DEMO_SNIPPETS } from '../../data/demo-snippets';
import {
  PRIMITIVE_CITIES,
  OBJECT_CITIES,
  GROUPED_CARS,
  TEAM_MEMBERS,
  City,
} from '../../data/demo-data';

@Component({
  selector: 'app-features-demos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbSelectComponent, ExampleCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 9. Custom Templates -->
    <div class="col-12" id="templates">
      <app-example-card
        title="9. Custom Content Templates"
        icon="bi bi-palette"
        iconClass="text-warning"
        [htmlCode]="snippets.templateHtml"
        [tsCode]="snippets.templateTs"
      >
        <p class="text-muted small mb-3">
          Customize item and selected item rendering using <code>#item</code> and
          <code>#selectedItem</code> templates.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold"
            >Team Members (Custom Items):</label
          >
          <ngb-select
            [options]="members"
            [(ngModel)]="selectedMember"
            optionLabel="name"
            [fluid]="true"
          >
            <ng-template #selectedItem let-member>
              <div class="d-flex align-items-center gap-2">
                <span class="badge rounded-pill" [ngClass]="member.badge">{{ member.status }}</span>
                <span class="fw-semibold">{{ member.name }}</span>
                <span class="text-muted small">&bull; {{ member.role }}</span>
              </div>
            </ng-template>
            <ng-template #item let-member>
              <div class="d-flex align-items-center justify-content-between w-100 py-1">
                <div>
                  <div class="fw-semibold">{{ member.name }}</div>
                  <small class="text-muted">{{ member.email }}</small>
                </div>
                <span class="badge" [ngClass]="member.badge">{{ member.role }}</span>
              </div>
            </ng-template>
          </ngb-select>
        </div>
      </app-example-card>
    </div>

    <!-- 10. Grouped Options -->
    <div class="col-12" id="grouping">
      <app-example-card
        title="10. Grouped Options"
        icon="bi bi-folder2-open"
        iconClass="text-danger"
        [htmlCode]="snippets.groupHtml"
        [tsCode]="snippets.groupTs"
      >
        <p class="text-muted small mb-3">
          Organize options into categories using <code>[group]="true"</code>,
          <code>optionGroupLabel</code>, and <code>optionGroupChildren</code>.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Select Car by Origin:</label>
          <ngb-select
            [options]="groupedCars"
            [(ngModel)]="selectedGroupedCar"
            [group]="true"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a car..."
            [showClear]="true"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected Car:</strong> <code>{{ selectedGroupedCar }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 11. Editable Combobox -->
    <div class="col-12" id="editable">
      <app-example-card
        title="11. Editable Combobox"
        icon="bi bi-pencil-square"
        iconClass="text-secondary"
        [htmlCode]="snippets.editableHtml"
        [tsCode]="snippets.editableTs"
      >
        <p class="text-muted small mb-3">
          Allows the user to select predefined options or freely type arbitrary custom text values
          with <code>[editable]="true"</code>.
        </p>
        <div class="mb-3">
          <ngb-select
            [options]="primitiveCities"
            [(ngModel)]="editableCity"
            [editable]="true"
            [showClear]="true"
            placeholder="Type or select a city..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Current Value:</strong> <code>{{ editableCity }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 12. Floating Labels -->
    <div class="col-12" id="float-label">
      <app-example-card
        title="12. Floating Labels"
        icon="bi bi-textarea-resize"
        iconClass="text-info"
        [htmlCode]="snippets.floatLabelHtml"
        [tsCode]="snippets.floatLabelTs"
      >
        <p class="text-muted small mb-3">
          Select supports 3 distinct floating label variants configured via
          <code>[floatLabel]="true"</code> and <code>floatLabelVariant="on" | "in" | "over"</code>:
        </p>
        <div class="mb-3">
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="floatCityOn"
            optionLabel="name"
            [floatLabel]="true"
            floatLabelVariant="on"
            [showClear]="true"
            placeholder="Outlined Border (on)"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="mb-3">
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="floatCityIn"
            optionLabel="name"
            [floatLabel]="true"
            floatLabelVariant="in"
            [showClear]="true"
            placeholder="In-Box Floating (in)"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="mb-3">
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="floatCityOver"
            optionLabel="name"
            [floatLabel]="true"
            floatLabelVariant="over"
            [showClear]="true"
            placeholder="Above Field (over)"
            [fluid]="true"
          >
          </ngb-select>
        </div>
      </app-example-card>
    </div>

    <!-- 13. Sizes & Variants -->
    <div class="col-12" id="sizes">
      <div class="card example-card">
        <div class="card-header p-3">
          <i class="bi bi-bounding-box text-success me-2"></i>13. Sizes & Variants
        </div>
        <div class="card-body p-3 d-flex flex-column gap-3">
          <p class="text-muted small mb-0">
            Control the visual appearance and scale of the dropdown with Bootstrap sizing
            (<code>.form-select-sm</code>, <code>.form-select-lg</code>) and background variants
            (<code>variant="filled"</code>).
          </p>
          <div>
            <label class="form-label text-muted small fw-semibold"
              >Small Size (<code>size="small"</code>)</label
            >
            <ngb-select
              [options]="objectCities"
              [(ngModel)]="sizeCity"
              optionLabel="name"
              size="small"
              [fluid]="true"
            ></ngb-select>
          </div>
          <div>
            <label class="form-label text-muted small fw-semibold"
              >Large Size (<code>size="large"</code>)</label
            >
            <ngb-select
              [options]="objectCities"
              [(ngModel)]="sizeCity"
              optionLabel="name"
              size="large"
              [fluid]="true"
            ></ngb-select>
          </div>
          <div>
            <label class="form-label text-muted small fw-semibold"
              >Filled Variant (<code>variant="filled"</code>)</label
            >
            <ngb-select
              [options]="objectCities"
              [(ngModel)]="sizeCity"
              optionLabel="name"
              variant="filled"
              [fluid]="true"
            ></ngb-select>
          </div>
          <div>
            <label class="form-label text-muted small fw-semibold"
              >Dropdown Direction / Position (<code
                >dropdownPosition="{{ demoDropdownPosition }}"</code
              >)</label
            >
            <div class="btn-group btn-group-sm w-100 mb-2" role="group">
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="demoDropdownPosition === 'auto'"
                (click)="demoDropdownPosition = 'auto'"
              >
                Auto (Default)
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="demoDropdownPosition === 'top'"
                (click)="demoDropdownPosition = 'top'"
              >
                Top (Dropup)
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="demoDropdownPosition === 'bottom'"
                (click)="demoDropdownPosition = 'bottom'"
              >
                Bottom (Dropdown)
              </button>
            </div>
            <ngb-select
              [options]="objectCities"
              [(ngModel)]="selectedPositionCity"
              optionLabel="name"
              [dropdownPosition]="demoDropdownPosition"
              [fluid]="true"
            ></ngb-select>
          </div>
        </div>
      </div>
    </div>

    <!-- 14. Loading State -->
    <div class="col-12" id="loading">
      <div class="card example-card">
        <div class="card-header d-flex align-items-center justify-content-between p-3">
          <span
            ><i class="bi bi-arrow-repeat text-secondary me-2"></i>14. Loading State & Async
            Fetch</span
          >
          <button
            class="btn btn-outline-primary btn-sm"
            (click)="reloadDynamicData()"
            [disabled]="isLoading"
          >
            <i class="bi bi-arrow-clockwise me-1" [class.animate-spin]="isLoading"></i> Reload
          </button>
        </div>
        <div class="card-body p-3">
          <p class="text-muted small mb-3">
            Displays a Bootstrap <code>.spinner-border</code> spinner in place of the chevron caret
            when <code>[loading]="true"</code>.
          </p>
          <div class="mb-3">
            <ngb-select
              [options]="loadingCities"
              [(ngModel)]="selectedLoadingCity"
              optionLabel="name"
              optionValue="code"
              [loading]="isLoading"
              placeholder="Loading dynamic cities..."
              [fluid]="true"
            >
            </ngb-select>
          </div>
          <div class="p-2 bg-light rounded text-muted small">
            <strong>Selected:</strong> <code>{{ selectedLoadingCity || 'None' }}</code>
          </div>
        </div>
      </div>
    </div>

    <!-- 15. Large Dataset -->
    <div class="col-12" id="virtual-scroll">
      <div class="card example-card">
        <div class="card-header p-3">
          <i class="bi bi-list-ol text-warning me-2"></i>15. Large Dataset (1,000 Items)
        </div>
        <div class="card-body p-3">
          <p class="text-muted small mb-3">
            Smooth scrolling container constrained with
            <code>scrollHeight="250px"</code> effortlessly rendering 1,000 entries with instant
            search capabilities.
          </p>
          <div class="mb-3">
            <ngb-select
              [options]="largeDataset"
              [(ngModel)]="selectedLargeItem"
              optionLabel="label"
              optionValue="value"
              [filter]="true"
              scrollHeight="250px"
              placeholder="Choose from 1,000 items..."
              [fluid]="true"
            >
            </ngb-select>
          </div>
          <div class="p-2 bg-light rounded text-muted small">
            <strong>Selected ID:</strong> <code>{{ selectedLargeItem || 'None' }}</code>
          </div>
        </div>
      </div>
    </div>

    <!-- 16. Modern Signals -->
    <div class="col-12" id="signals">
      <app-example-card
        title="16. Modern Angular Signals"
        icon="bi bi-lightning-charge-fill"
        iconClass="text-warning"
        [htmlCode]="snippets.signalsHtml"
        [tsCode]="snippets.signalsTs"
      >
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-4">
          <div>
            <p class="text-muted mb-0 small">
              Seamless two-way reactivity with Angular's reactive Signals primitives (<code
                >signal()</code
              >
              and <code>model()</code>) with zero change detection delays.
            </p>
          </div>
          <div style="min-width: 280px">
            <ngb-select
              [options]="objectCities"
              [ngModel]="signalCity()"
              (ngModelChange)="signalCity.set($event)"
              optionLabel="name"
              optionValue="code"
              [fluid]="true"
            >
            </ngb-select>
          </div>
          <div class="badge bg-primary fs-6 p-2">
            Signal Value: <code>{{ signalCity() }}</code>
          </div>
        </div>
      </app-example-card>
    </div>
  `,
})
export class FeaturesDemosComponent implements OnInit {
  snippets = DEMO_SNIPPETS;

  primitiveCities = PRIMITIVE_CITIES;
  objectCities = OBJECT_CITIES;
  members = TEAM_MEMBERS;
  groupedCars = GROUPED_CARS;

  selectedMember: any = this.members[0];
  selectedGroupedCar: string | null = 'Porsche';
  editableCity: string = 'San Francisco';

  floatCityOn: City | null = null;
  floatCityIn: City | null = this.objectCities[1];
  floatCityOver: City | null = null;

  sizeCity: City | null = this.objectCities[0];
  demoDropdownPosition: 'auto' | 'top' | 'bottom' = 'auto';
  selectedPositionCity: City | null = this.objectCities[0];

  loadingCities: City[] = [];
  isLoading = false;
  selectedLoadingCity: string | null = null;

  largeDataset: { label: string; value: number }[] = [];
  selectedLargeItem: number | null = null;

  signalCity = signal<string>('TOK');

  ngOnInit(): void {
    for (let i = 1; i <= 1000; i++) {
      this.largeDataset.push({ label: `Option Item #${i}`, value: i });
    }
    this.reloadDynamicData();
  }

  reloadDynamicData(): void {
    this.isLoading = true;
    this.loadingCities = [];
    setTimeout(() => {
      this.loadingCities = [...this.objectCities];
      this.isLoading = false;
    }, 1500);
  }
}
