import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbSelectComponent } from '../../../lib/ngb-select.component';
import { FocusOnOpenStrategy, SelectFilterMatchMode } from '../../../lib/ngb-select.interface';
import { ExampleCardComponent } from '../example-card.component';
import { DEMO_SNIPPETS } from '../../data/demo-snippets';
import { PRIMITIVE_CITIES, OBJECT_CITIES, COUNTRIES, City, Country } from '../../data/demo-data';

@Component({
  selector: 'app-basic-demos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbSelectComponent, ExampleCardComponent],
  template: `
    <!-- 1. Basic Single Selection -->
    <div class="col-12" id="basic">
      <app-example-card
        title="1. Basic Single Selection"
        icon="bi bi-check-circle-fill"
        iconClass="text-primary"
        [htmlCode]="snippets.basicHtml"
        [tsCode]="snippets.basicTs"
      >
        <p class="text-muted small mb-3">
          Standard single-value dropdown supporting arrays of primitives or complex objects.
          Use <code>optionLabel</code> to specify the display property and
          <code>dataKey</code> for object identity comparisons.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Select City</label>
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="selectedObjectCity"
            optionLabel="name"
            [dataKey]="'code'"
            placeholder="Select a city"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Value:</strong> <code>{{ selectedObjectCity | json }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 2. Multi-Select & Chips Display -->
    <div class="col-12" id="multi-select">
      <app-example-card
        title="2. Multi-Select & Chips Mode"
        icon="bi bi-check-all"
        iconClass="text-success"
        [htmlCode]="snippets.multiChipsHtml"
        [tsCode]="snippets.multiChipsTs"
      >
        <p class="text-muted small mb-3">
          Enables multi-selection with checkboxes inside the list. When
          <code>display="chip"</code>, selected items appear as removable Bootstrap badge
          chips with individual close buttons.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold"
            >Select Multiple Cities (Chips Mode)</label
          >
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="selectedChipsCities"
            optionLabel="name"
            [dataKey]="'code'"
            [multiple]="true"
            display="chip"
            [showClear]="true"
            placeholder="Choose cities..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected ({{ selectedChipsCities.length }}):</strong>
          <code>{{ selectedChipsCities | json }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 3. Multi-Select with "Select All" -->
    <div class="col-12" id="select-all">
      <app-example-card
        title="3. Multi-Select with 'Select All'"
        icon="bi bi-ui-checks-grid"
        iconClass="text-primary"
        [htmlCode]="snippets.selectAllHtml"
        [tsCode]="snippets.selectAllTs"
      >
        <p class="text-muted small mb-3">
          Renders a sticky header checkbox with <code>[showSelectAll]="true"</code>.
          Toggling it selects or deselects all active items, respecting any active filter
          search criteria.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold"
            >Select Countries (Select All Enabled)</label
          >
          <ngb-select
            [options]="countries"
            [(ngModel)]="selectedAllCountries"
            optionLabel="name"
            [dataKey]="'code'"
            [multiple]="true"
            [showSelectAll]="true"
            [filter]="true"
            filterBy="name,currency"
            [showClear]="true"
            placeholder="Choose countries..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected Count:</strong>
          <code>{{ selectedAllCountries.length }} / {{ countries.length }} countries</code>
        </div>
      </app-example-card>
    </div>

    <!-- 4. In-Trigger Search & Custom Placeholders -->
    <div class="col-12" id="trigger-search">
      <app-example-card
        title="4. In-Trigger Search & Custom Search Placeholder"
        icon="bi bi-search"
        iconClass="text-warning"
        cardClass="border-warning-subtle"
        headerClass="bg-warning-subtle bg-opacity-10"
        titleClass="text-warning-emphasis fw-bold"
        [htmlCode]="snippets.triggerHtml"
        [tsCode]="snippets.triggerTs"
      >
        <p class="text-muted small mb-3">
          Embeds the filter input directly inside the main select box using
          <code>[filterInTrigger]="true"</code> with custom
          <code>searchPlaceholder</code> for seamless inline searchable autocomplete.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Inline Search Trigger:</label>
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="selectedTriggerCity"
            optionLabel="name"
            [filter]="true"
            [filterInTrigger]="true"
            searchPlaceholder="Type directly here to filter cities..."
            [showClear]="true"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected City:</strong> <code>{{ selectedTriggerCity | json }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 5. Searchable Multi-Select -->
    <div class="col-12" id="searchable-multi">
      <app-example-card
        title="5. Searchable Multi-Select with Chips & Select All"
        icon="bi bi-filter-square-fill"
        iconClass="text-info"
        cardClass="border-info-subtle"
        headerClass="bg-info-subtle bg-opacity-10"
        titleClass="text-info-emphasis fw-bold"
        [htmlCode]="snippets.searchableMultiHtml"
        [tsCode]="snippets.searchableMultiTs"
      >
        <p class="text-muted small mb-3">
          Combines multi-field search (<code>filterBy="name,code,currency"</code>),
          removable chip badges (<code>display="chip"</code>), and sticky "Select All" header.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold"
            >Select Multiple Countries (Multi-Field Filter):</label
          >
          <ngb-select
            [options]="countries"
            [(ngModel)]="selectedSearchableMulti"
            optionLabel="name"
            [multiple]="true"
            display="chip"
            [filter]="true"
            filterBy="name,code,currency"
            searchPlaceholder="Search by country, code, currency..."
            [showSelectAll]="true"
            selectAllLabel="Select All Matches"
            [showClear]="true"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected ({{ selectedSearchableMulti.length }}):</strong>
          <code>{{ selectedSearchableMulti | json }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 6. Focus on Open Example -->
    <div class="col-12" id="focus-open">
      <app-example-card
        title="6. Focus on Open Index"
        icon="bi bi-bullseye"
        iconClass="text-danger"
        [htmlCode]="snippets.focusOnOpenHtml"
        [tsCode]="snippets.focusOnOpenTs"
      >
        <p class="text-muted small mb-3">
          Configure <code>[focusOnOpen]="index"</code> and
          <code>[focusOnOpenStrategy]</code> to choose whether target index is focused
          <strong>always</strong>, or
          <strong>only when no value is currently selected</strong> (if a value is selected,
          it focuses the selected item instead).
        </p>
        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <label class="form-label text-muted small fw-semibold mb-1">Target Focus Index</label>
            <select class="form-select form-select-sm" [(ngModel)]="focusOpenIndex">
              <option [ngValue]="0">0 - New York</option>
              <option [ngValue]="1">1 - Rome</option>
              <option [ngValue]="2">2 - London</option>
              <option [ngValue]="3">3 - Istanbul</option>
              <option [ngValue]="4">4 - Paris</option>
              <option [ngValue]="5">5 - Tokyo</option>
            </select>
          </div>
          <div class="col-sm-6">
            <label class="form-label text-muted small fw-semibold mb-1">Focus Strategy</label>
            <select class="form-select form-select-sm" [(ngModel)]="focusOpenStrategy">
              <option value="always">always (Always Target Index)</option>
              <option value="notSelected">notSelected (Only If Not Selected)</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <ngb-select
            [options]="objectCities"
            [(ngModel)]="selectedFocusCity"
            optionLabel="name"
            [focusOnOpen]="focusOpenIndex"
            [focusOnOpenStrategy]="focusOpenStrategy"
            [showClear]="true"
            placeholder="Click to open & auto-focus target"
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected:</strong>
          <code>{{ selectedFocusCity ? selectedFocusCity.name : 'None' }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 7. Reactive Forms & Validation -->
    <div class="col-12" id="reactive-forms">
      <app-example-card
        title="7. Reactive Forms & Validation"
        icon="bi bi-ui-radios"
        iconClass="text-info"
        [htmlCode]="snippets.reactiveHtml"
        [tsCode]="snippets.reactiveTs"
      >
        <p class="text-muted small mb-3">
          Implements Angular's <code>ControlValueAccessor</code> interface with full
          validation status support. Highlights with <code>.is-invalid</code> and displays
          field errors upon touched validation.
        </p>
        <form [formGroup]="userForm" (ngSubmit)="submitReactiveForm()">
          <div class="mb-3">
            <label class="form-label text-muted small fw-semibold">City (Required)</label>
            <ngb-select
              [options]="objectCities"
              formControlName="city"
              optionLabel="name"
              [invalid]="!!(userForm.get('city')?.invalid && userForm.get('city')?.touched)"
              [showClear]="true"
              placeholder="Select a city"
              [fluid]="true"
            >
            </ngb-select>
            @if (userForm.get('city')?.invalid && userForm.get('city')?.touched) {
              <div class="text-danger small mt-1">
                <i class="bi bi-exclamation-circle me-1"></i> City selection is required.
              </div>
            }
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <button type="submit" class="btn btn-primary btn-sm">Submit Form</button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              (click)="userForm.reset()"
            >
              Reset
            </button>
          </div>
        </form>
      </app-example-card>
    </div>

    <!-- 8. Search & Filtering -->
    <div class="col-12" id="filtering">
      <app-example-card
        title="8. Search & Filtering Options"
        icon="bi bi-funnel"
        iconClass="text-primary"
        [htmlCode]="snippets.filterHtml"
        [tsCode]="snippets.filterTs"
      >
        <p class="text-muted small mb-3">
          Dynamic client-side filtering with configurable match mode (<code>contains</code>,
          <code>startsWith</code>, <code>endsWith</code>, <code>equals</code>).
        </p>
        <div class="row g-2 mb-3">
          <div class="col-sm-6">
            <label class="form-label text-muted small fw-semibold mb-1">Match Mode</label>
            <select class="form-select form-select-sm" [(ngModel)]="filterMatchMode">
              <option value="contains">contains</option>
              <option value="startsWith">startsWith</option>
              <option value="endsWith">endsWith</option>
              <option value="equals">equals</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <ngb-select
            [options]="countries"
            [(ngModel)]="selectedCountryFilter"
            optionLabel="name"
            optionValue="code"
            [filter]="true"
            filterBy="name,code"
            [filterMatchMode]="filterMatchMode"
            filterPlaceholder="Search country name or code..."
            [showClear]="true"
            placeholder="Filter country..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected Code:</strong> <code>{{ selectedCountryFilter }}</code>
        </div>
      </app-example-card>
    </div>
  `,
})
export class BasicDemosComponent {
  snippets = DEMO_SNIPPETS;

  objectCities = OBJECT_CITIES;
  primitiveCities = PRIMITIVE_CITIES;
  countries = COUNTRIES;

  selectedObjectCity: City | null = this.objectCities[1];
  selectedChipsCities: City[] = [this.objectCities[0], this.objectCities[2], this.objectCities[4]];
  selectedAllCountries: Country[] = [];
  selectedTriggerCity: City | null = null;
  selectedSearchableMulti: Country[] = [this.countries[0], this.countries[8]];

  focusOpenIndex: number = 3;
  focusOpenStrategy: FocusOnOpenStrategy = 'always';
  selectedFocusCity: City | null = null;

  userForm = new FormGroup({
    city: new FormControl<City | null>(null, [Validators.required]),
  });

  selectedCountryFilter: string | null = 'SA';
  filterMatchMode: SelectFilterMatchMode = 'contains';

  submitReactiveForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      alert('Form Valid & Submitted: ' + JSON.stringify(this.userForm.value));
    }
  }
}
