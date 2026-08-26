# 07. Comprehensive Demo Showcase Examples

This document serves as the complete catalog of demo examples for the `ngb-select` component. Each example includes the template markup, component TypeScript logic, and feature explanation.

---

## Catalog Overview

| #      | Demo Title                                                                              | Key Features Demonstrated                                             |
| :----- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **01** | [Basic Selection](#01-basic-selection)                                                  | Primitives, objects, `optionLabel`, `optionValue`                     |
| **02** | [Modern Signals & Template Forms](#02-modern-signals--template-forms)                   | `model()` Signals, `[(ngModel)]`                                      |
| **03** | [Reactive Forms & Validation](#03-reactive-forms--validation)                           | `FormGroup`, `FormControl`, `[invalid]`, Bootstrap validation classes |
| **04** | [Search Filtering & Match Modes](#04-search-filtering--match-modes)                     | `filter`, `filterBy`, `filterMatchMode`, `filterPlaceholder`          |
| **05** | [Clear Icon](#05-clear-icon)                                                            | `showClear`, `(onClear)` event                                        |
| **06** | [Sizes & Label Position Variants](#06-sizes--label-position-variants-over-in-on)        | `size="small\|large"`, `variant="over\|in\|on"` (label positions)     |
| **07** | [Custom Item & Selected Templating](#07-custom-item--selected-templating)               | `#item`, `#selectedItem`, avatars, badges                             |
| **08** | [Header, Footer & Empty Templates](#08-header-footer--empty-templates)                  | `#header`, `#footer`, `#empty`                                        |
| **09** | [Grouped Options](#09-grouped-options)                                                  | `group="true"`, `optionGroupLabel`, `optionGroupChildren`             |
| **10** | [Multi-Select (Comma Summary)](#10-multi-select-comma-summary)                          | `multiple="true"`, `maxSelectedLabels`, `selectedItemsLabel`          |
| **11** | [Multi-Select with Chips & Limit](#11-multi-select-with-chips--limit)                   | `display="chip"`, `selectionLimit`, `(onRemoveChip)`                  |
| **12** | [Multi-Select with Select All](#12-multi-select-with-select-all)                        | `showSelectAll="true"`, `selectAllLabel`, `(onSelectAllChange)`       |
| **13** | [Editable Combobox](#13-editable-combobox)                                              | `editable="true"`, custom user typing, `maxLength`                    |
| **14** | [Component States](#14-component-states)                                                | `disabled`, `readonly`, `loading` (spinner)                           |
| **15** | [Lazy Loading & Infinite Scroll](#15-lazy-loading--infinite-scroll)                     | `lazy="true"`, `(onLazyLoad)`                                         |
| **16** | [Overlay Append to Body](#16-overlay-append-to-body)                                    | `appendTo="body"`, modal dialog escape                                |
| **17** | [RTL & Arabic (AR) Showcase](#17-rtl--arabic-ar-showcase)                               | `dir="rtl"`, Arabic datasets, Alef/Tashkeel normalization             |
| **18** | [Cascading / Dependent Dropdowns](#18-cascading--dependent-dropdowns)                   | Country $\rightarrow$ State $\rightarrow$ City chain binding          |
| **19** | [Server-Side Debounced Async Search](#19-server-side-debounced-async-search)            | Remote HTTP query with `(onFilter)` debouncing                        |
| **20** | [Custom Clear & Dropdown Icon Templates](#20-custom-clear--dropdown-icon-templates)     | `#clearIcon`, `#dropdownIcon` overrides                               |
| **21** | [Table Cell In-Place Inline Editing](#21-table-cell-in-place-inline-editing)            | Data table row inline editing with compact sizing                     |
| **22** | [Bootstrap Modal Integration](#22-bootstrap-modal-integration)                          | Dialog z-index, backdrop dismissal, `appendTo="body"`                 |
| **23** | [Multi-Select with Custom Chip Template](#23-multi-select-with-custom-chip-template)    | Custom chip layout with avatar, status badge, and close               |
| **24** | [Bootstrap Dark Mode & Theme Switching](#24-bootstrap-dark-mode--theme-switching)       | `data-bs-theme="dark"` styling and CSS variables                      |
| **25** | [Accessibility (A11y) & Keyboard Traversal](#25-accessibility-a11y--keyboard-traversal) | ARIA `combobox`, `listbox`, keyboard focus and traversal              |
| **26** | [Form Reset & Dynamic Disabling](#26-form-reset--dynamic-disabling)                     | Programmatic control `.disable()`, `.reset()` flows                   |
| **27** | [Hierarchical Grouped Multi-Select](#27-hierarchical-grouped-multi-select)              | Multi-select across grouped option categories                         |

---

## 01. Basic Selection

Demonstrates single selection with both primitive arrays and complex object arrays.

```typescript
// Component
@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule],
  template: `
    <div class="row g-3">
      <!-- Primitives -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">Primitive Strings:</label>
        <ngb-select
          [options]="simpleCities"
          [(ngModel)]="selectedSimpleCity"
          placeholder="Select a city"
        >
        </ngb-select>
        <div class="form-text">Selected: {{ selectedSimpleCity }}</div>
      </div>

      <!-- Objects -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">Complex Objects (Code bound):</label>
        <ngb-select
          [options]="cities"
          [(ngModel)]="selectedCityCode"
          optionLabel="name"
          optionValue="code"
          placeholder="Select a city"
        >
        </ngb-select>
        <div class="form-text">Selected code: {{ selectedCityCode }}</div>
      </div>
    </div>
  `,
})
export class BasicDemoComponent {
  simpleCities = ['New York', 'London', 'Paris', 'Tokyo'];
  selectedSimpleCity: string | null = null;

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Tokyo', code: 'TKO' },
  ];
  selectedCityCode = 'LDN';
}
```

---

## 02. Modern Signals & Template Forms

Binds model values via Angular 17+ `signal` / `model()`.

```typescript
@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule],
  template: `
    <label class="form-label fw-semibold">Bound to Signal:</label>
    <ngb-select
      [options]="fruits"
      [(ngModel)]="selectedFruit"
      optionLabel="label"
      optionValue="id"
      placeholder="Select Fruit"
    >
    </ngb-select>
    <button class="btn btn-sm btn-outline-secondary mt-2" (click)="resetSignal()">
      Reset Signal to Apple
    </button>
  `,
})
export class SignalDemoComponent {
  fruits = [
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Orange' },
    { id: 3, label: 'Banana' },
  ];
  selectedFruit = signal<number>(1);

  resetSignal(): void {
    this.selectedFruit.set(1);
  }
}
```

---

## 03. Reactive Forms & Validation

Shows `FormGroup` integration, required validation, and `.is-invalid` UI states.

```typescript
@Component({
  standalone: true,
  imports: [NgbSelectComponent, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="submit()">
      <div class="mb-3">
        <label class="form-label fw-semibold">Country (Required):</label>
        <ngb-select
          [options]="countries"
          formControlName="country"
          optionLabel="name"
          optionValue="code"
          [invalid]="userForm.get('country')?.invalid && userForm.get('country')?.touched"
          placeholder="Select Country"
        >
        </ngb-select>
        <div
          *ngIf="userForm.get('country')?.invalid && userForm.get('country')?.touched"
          class="text-danger small mt-1"
        >
          Country selection is required.
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-sm" [disabled]="userForm.invalid">
        Submit
      </button>
    </form>
  `,
})
export class ReactiveValidationDemoComponent {
  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Germany', code: 'DE' },
    { name: 'Japan', code: 'JP' },
  ];

  userForm = new FormGroup({
    country: new FormControl(null, [Validators.required]),
  });

  submit(): void {
    console.log(this.userForm.value);
  }
}
```

---

## 04. Search Filtering & Match Modes

Demonstrates built-in filtering, searching against multiple object keys (`filterBy`), and match mode configurations.

```html
<div class="row g-3">
  <!-- Custom Search Text in Placeholder (filterPlaceholder / searchPlaceholder) -->
  <div class="col-md-4">
    <label class="form-label fw-semibold">Search Text in Filter Placeholder:</label>
    <ngb-select
      [options]="cars"
      [(ngModel)]="selectedCar"
      optionLabel="name"
      [filter]="true"
      searchPlaceholder="Type to search available cars..."
      placeholder="Select Car"
    >
    </ngb-select>
  </div>

  <!-- In-Trigger Search (Search directly in select placeholder area) -->
  <div class="col-md-4">
    <label class="form-label fw-semibold">In-Trigger Search (Search in Placeholder):</label>
    <ngb-select
      [options]="cars"
      [(ngModel)]="selectedCarInTrigger"
      optionLabel="name"
      [filter]="true"
      [filterInTrigger]="true"
      placeholder="Search or select car directly..."
    >
    </ngb-select>
  </div>

  <!-- Multi-field Contains filter -->
  <div class="col-md-4">
    <label class="form-label fw-semibold">Search by Name or VIN (Contains):</label>
    <ngb-select
      [options]="cars"
      [(ngModel)]="selectedCar2"
      optionLabel="name"
      [filter]="true"
      filterBy="name,vin"
      filterMatchMode="contains"
      filterPlaceholder="Search name or VIN..."
      placeholder="Select Car"
    >
    </ngb-select>
  </div>
</div>
```

---

## 05. Clear Icon

Enables a clear icon (`showClear`) to reset the selection back to `null`.

```html
<ngb-select
  [options]="departments"
  [(ngModel)]="selectedDept"
  optionLabel="name"
  optionValue="id"
  [showClear]="true"
  placeholder="Select Department"
  (onClear)="onDepartmentCleared()"
>
</ngb-select>
```

---

## 06. Sizes & Label Position Variants (`over`, `in`, `on`)

The `variant` property defines the position of the label. Default value is `over`, whereas `in` and `on` are the alternatives.

```html
<div class="row g-3">
  <!-- Default Variant: 'over' (Label positioned over/above the input) -->
  <div class="col-md-4">
    <label class="form-label fw-semibold">Variant: 'over' (Default):</label>
    <ngb-select [options]="options" [(ngModel)]="val1" variant="over" placeholder="Select Option">
    </ngb-select>
  </div>

  <!-- Variant: 'in' (Inward floating label inside the select container) -->
  <div class="col-md-4">
    <ngb-select
      [options]="options"
      [(ngModel)]="val2"
      variant="in"
      placeholder="Variant: 'in' (Inside Label)"
    >
    </ngb-select>
  </div>

  <!-- Variant: 'on' (Floating label positioned on the border line) -->
  <div class="col-md-4">
    <ngb-select
      [options]="options"
      [(ngModel)]="val3"
      variant="on"
      placeholder="Variant: 'on' (On Border)"
    >
    </ngb-select>
  </div>
</div>

<div class="row g-3 mt-2">
  <!-- Small Size -->
  <div class="col-md-6">
    <label class="form-label small">Small Size (.form-select-sm):</label>
    <ngb-select
      [options]="options"
      [(ngModel)]="valSmall"
      size="small"
      placeholder="Small Select"
    ></ngb-select>
  </div>

  <!-- Large Size -->
  <div class="col-md-6">
    <label class="form-label">Large Size (.form-select-lg):</label>
    <ngb-select
      [options]="options"
      [(ngModel)]="valLarge"
      size="large"
      placeholder="Large Select"
    ></ngb-select>
  </div>
</div>
```

---

## 07. Custom Item & Selected Templating

Customizes dropdown items with user avatars and selected view layout.

```html
<ngb-select
  [options]="users"
  [(ngModel)]="selectedUser"
  optionLabel="name"
  placeholder="Assign user"
>
  <!-- Trigger Template -->
  <ng-template #selectedItem let-user>
    <div class="d-flex align-items-center gap-2">
      <img [src]="user.avatar" class="rounded-circle" width="22" height="22" />
      <span class="fw-semibold">{{ user.name }}</span>
      <span class="badge bg-secondary-subtle text-secondary ms-auto">{{ user.role }}</span>
    </div>
  </ng-template>

  <!-- Dropdown List Item Template -->
  <ng-template #item let-user>
    <div class="d-flex align-items-center justify-content-between w-100 py-1">
      <div class="d-flex align-items-center gap-2">
        <img [src]="user.avatar" class="rounded-circle" width="30" height="30" />
        <div>
          <div class="fw-semibold">{{ user.name }}</div>
          <small class="text-muted">{{ user.email }}</small>
        </div>
      </div>
      <span class="badge bg-primary-subtle text-primary">{{ user.role }}</span>
    </div>
  </ng-template>
</ngb-select>
```

---

## 08. Header, Footer & Empty Templates

Inject custom action bars in the header, footers with counter, and custom empty search states.

```html
<ngb-select
  [options]="products"
  [(ngModel)]="selectedProduct"
  [filter]="true"
  placeholder="Select Product"
>
  <!-- Custom Header -->
  <ng-template #header>
    <div class="p-2 border-bottom bg-light d-flex justify-content-between align-items-center">
      <span class="small fw-bold text-uppercase text-muted">Available Inventory</span>
      <button class="btn btn-xs btn-outline-primary" (click)="refreshInventory()">Refresh</button>
    </div>
  </ng-template>

  <!-- Custom Empty Filter Message -->
  <ng-template #empty>
    <div class="text-center py-3">
      <i class="bi bi-search text-muted fs-4"></i>
      <p class="small text-muted mb-0 mt-1">No matching products found.</p>
    </div>
  </ng-template>

  <!-- Custom Footer -->
  <ng-template #footer>
    <div class="p-2 border-top bg-light text-muted small text-end">
      Total items: {{ products.length }}
    </div>
  </ng-template>
</ngb-select>
```

---

## 09. Grouped Options

Displays nested categorized datasets with non-selectable section headers.

```html
<ngb-select
  [options]="groupedVehicles"
  [(ngModel)]="selectedVehicle"
  [group]="true"
  optionGroupLabel="category"
  optionGroupChildren="items"
  optionLabel="label"
  optionValue="value"
  placeholder="Select a vehicle"
>
</ngb-select>
```

---

## 10. Searchable Multi-Select (Chips, Search Placeholder & FilterBy)

Combines multi-selection with real-time search filtering, customizable search placeholder, multi-field searching, removable chips, and clear icon.

```typescript
@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule, CommonModule],
  template: `
    <div class="card p-3 shadow-sm">
      <label class="form-label fw-bold">Select Multiple Countries (Searchable):</label>
      <ngb-select
        [options]="countries"
        [(ngModel)]="selectedCountries"
        optionLabel="name"
        optionValue="code"
        [multiple]="true"
        display="chip"
        [filter]="true"
        filterBy="name,code,continent"
        filterMatchMode="contains"
        searchPlaceholder="Type country name, ISO code, or continent..."
        [showSelectAll]="true"
        selectAllLabel="Select All Matching"
        [showClear]="true"
        placeholder="Choose countries to export..."
      >
      </ngb-select>

      <div class="mt-2 text-muted small">
        Selected ISO Codes: <code>{{ selectedCountries | json }}</code>
      </div>
    </div>
  `,
})
export class SearchMultiSelectDemoComponent {
  selectedCountries: string[] = ['US', 'DE'];

  countries = [
    { name: 'United States', code: 'US', continent: 'North America' },
    { name: 'Germany', code: 'DE', continent: 'Europe' },
    { name: 'Japan', code: 'JP', continent: 'Asia' },
    { name: 'United Kingdom', code: 'UK', continent: 'Europe' },
    { name: 'Canada', code: 'CA', continent: 'North America' },
    { name: 'Australia', code: 'AU', continent: 'Oceania' },
    { name: 'Brazil', code: 'BR', continent: 'South America' },
    { name: 'Saudi Arabia', code: 'SA', continent: 'Asia' },
    { name: 'France', code: 'FR', continent: 'Europe' },
  ];
}
```

---

## 11. Multi-Select (Comma Summary & Selection Limit)

Select multiple options with an automatic summary count when selection exceeds `maxSelectedLabels`, plus an enforced `selectionLimit`.

```html
<ngb-select
  [options]="technologies"
  [(ngModel)]="selectedTech"
  optionLabel="name"
  optionValue="id"
  [multiple]="true"
  [maxSelectedLabels]="2"
  selectedItemsLabel="{0} technologies chosen"
  [selectionLimit]="4"
  [filter]="true"
  searchPlaceholder="Search tech stack..."
  [showClear]="true"
  placeholder="Choose technologies (Max 4)"
>
</ngb-select>
```

---

## 12. Multi-Select with Select All

Adds a sticky checkbox in the header to toggle all options at once.

```html
<ngb-select
  [options]="permissions"
  [(ngModel)]="selectedPermissions"
  optionLabel="title"
  optionValue="key"
  [multiple]="true"
  [showSelectAll]="true"
  selectAllLabel="Select All Permissions"
  [filter]="true"
  placeholder="Assign permissions"
  (onSelectAllChange)="onPermissionsAllToggled($event)"
>
</ngb-select>
```

---

## 13. Editable Combobox

Allows freeform custom text entry in addition to list selection.

```html
<ngb-select
  [options]="customTags"
  [(ngModel)]="selectedTag"
  [editable]="true"
  [maxLength]="30"
  placeholder="Choose tag or type custom..."
>
</ngb-select>
```

---

## 14. Component States

Demonstrates disabled, readonly, and asynchronous loading spinner states.

```html
<div class="row g-3">
  <div class="col-md-4">
    <label class="form-label small">Disabled State:</label>
    <ngb-select [options]="options" [disabled]="true" placeholder="Disabled select"></ngb-select>
  </div>
  <div class="col-md-4">
    <label class="form-label small">Readonly State:</label>
    <ngb-select [options]="options" [(ngModel)]="readonlyVal" [readonly]="true"></ngb-select>
  </div>
  <div class="col-md-4">
    <label class="form-label small">Loading Spinner:</label>
    <ngb-select [options]="[]" [loading]="true" placeholder="Fetching remote data..."></ngb-select>
  </div>
</div>
```

---

## 15. Lazy Loading & Infinite Scroll

Emits `(onLazyLoad)` when scrolling to the bottom of the dropdown list.

```html
<ngb-select
  [options]="virtualRecords"
  [(ngModel)]="selectedRecord"
  optionLabel="title"
  [lazy]="true"
  scrollHeight="250px"
  placeholder="Scroll to load more"
  (onLazyLoad)="fetchNextBatch()"
>
</ngb-select>
```

---

## 16. Overlay Append to Body

Appends `.dropdown-menu` directly to `document.body` to prevent clipping inside modals or `overflow: hidden` containers.

```html
<!-- Inside a small scrollable card or modal dialog -->
<div class="modal-body overflow-hidden">
  <ngb-select
    [options]="cities"
    [(ngModel)]="selectedCity"
    optionLabel="name"
    appendTo="body"
    placeholder="Select without modal clipping"
  >
  </ngb-select>
</div>
```

---

## 17. RTL & Arabic (AR) Showcase

Comprehensive Arabic showcase demonstrating full RTL layout, Arabic search normalization, chips, and localized error messages.

```html
<div dir="rtl" lang="ar" class="p-3 border rounded bg-white">
  <h5 class="mb-3 text-primary">العرض التجريبي باللغة العربية (RTL)</h5>

  <div class="row g-3">
    <!-- Single Select -->
    <div class="col-md-6">
      <label class="form-label fw-bold">اختر الدولة:</label>
      <ngb-select
        [options]="arabicCountries"
        [(ngModel)]="selectedCountry"
        optionLabel="name"
        optionValue="code"
        [filter]="true"
        filterPlaceholder="ابحث عن دولة..."
        placeholder="-- اختر --"
        emptyMessage="لا توجد نتائج"
        emptyFilterMessage="لم يتم العثور على نتائج مطابقة"
      >
      </ngb-select>
    </div>

    <!-- Multi-Select with Chips & Select All -->
    <div class="col-md-6">
      <label class="form-label fw-bold">المدن المختارة (تحديد متعدد مع وسوم):</label>
      <ngb-select
        [options]="arabicCities"
        [(ngModel)]="selectedCities"
        optionLabel="name"
        optionValue="id"
        [multiple]="true"
        display="chip"
        [showSelectAll]="true"
        selectAllLabel="تحديد الكل"
        selectedItemsLabel="{0} مدن محددة"
        [filter]="true"
        filterPlaceholder="ابحث عن مدينة..."
        placeholder="اختر المدن"
      >
      </ngb-select>
    </div>
  </div>
</div>
```

---

## 18. Cascading / Dependent Dropdowns

Demonstrates linked dropdowns where selecting a parent automatically filters the available options in the child dropdown and resets downstream selections.

```typescript
@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule, CommonModule],
  template: `
    <div class="row g-3">
      <!-- Country Dropdown -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">1. Select Country:</label>
        <ngb-select
          [options]="countries"
          [(ngModel)]="selectedCountry"
          optionLabel="name"
          optionValue="code"
          [showClear]="true"
          placeholder="Choose Country"
          (onChange)="onCountryChange($event.value)"
        >
        </ngb-select>
      </div>

      <!-- Dependent City Dropdown -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">2. Select City:</label>
        <ngb-select
          [options]="availableCities"
          [(ngModel)]="selectedCity"
          optionLabel="name"
          optionValue="id"
          [disabled]="!selectedCountry"
          [placeholder]="selectedCountry ? 'Choose City' : 'Select a country first'"
        >
        </ngb-select>
      </div>
    </div>
  `,
})
export class CascadingDemoComponent {
  selectedCountry: string | null = null;
  selectedCity: number | null = null;

  countries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Germany', code: 'DE' },
  ];

  allCities = [
    { id: 1, countryCode: 'US', name: 'New York' },
    { id: 2, countryCode: 'US', name: 'San Francisco' },
    { id: 3, countryCode: 'UK', name: 'London' },
    { id: 4, countryCode: 'UK', name: 'Manchester' },
    { id: 5, countryCode: 'DE', name: 'Berlin' },
    { id: 6, countryCode: 'DE', name: 'Munich' },
  ];

  availableCities: any[] = [];

  onCountryChange(countryCode: string | null): void {
    this.selectedCity = null;
    if (countryCode) {
      this.availableCities = this.allCities.filter((c) => c.countryCode === countryCode);
    } else {
      this.availableCities = [];
    }
  }
}
```

---

## 19. Server-Side Debounced Async Search

Demonstrates handling live remote API searches with debouncing via the `(onFilter)` event.

```typescript
@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule, CommonModule],
  template: `
    <label class="form-label fw-semibold">Remote Async Search (GitHub Users):</label>
    <ngb-select
      [options]="searchResults"
      [(ngModel)]="selectedUser"
      optionLabel="login"
      optionValue="id"
      [filter]="true"
      [loading]="isLoading"
      filterPlaceholder="Type at least 2 characters..."
      placeholder="Search GitHub users..."
      (onFilter)="onSearchFilter($event.filter)"
    >
    </ngb-select>
  `,
})
export class AsyncSearchDemoComponent {
  searchResults: any[] = [];
  selectedUser: number | null = null;
  isLoading = false;
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query || query.length < 2) {
            this.isLoading = false;
            return of([]);
          }
          this.isLoading = true;
          // Simulated HTTP search call
          return of([
            { id: 101, login: `${query}_dev` },
            { id: 102, login: `${query}_lead` },
            { id: 103, login: `${query}_architect` },
          ]).pipe(delay(300));
        }),
      )
      .subscribe((results) => {
        this.searchResults = results;
        this.isLoading = false;
      });
  }

  onSearchFilter(query: string): void {
    this.searchSubject.next(query);
  }
}
```

---

## 20. Custom Clear & Dropdown Icon Templates

Demonstrates overriding default icons using `#clearIcon` and `#dropdownIcon` template outlets.

```html
<ngb-select
  [options]="browsers"
  [(ngModel)]="selectedBrowser"
  [showClear]="true"
  placeholder="Select Web Browser"
>
  <!-- Custom Clear Button (Trash icon) -->
  <ng-template #clearIcon>
    <i class="bi bi-trash text-danger me-2 cursor-pointer"></i>
  </ng-template>

  <!-- Custom Dropdown Trigger Caret -->
  <ng-template #dropdownIcon>
    <i class="bi bi-chevron-bar-expand text-primary"></i>
  </ng-template>
</ngb-select>
```

---

## 21. Table Cell In-Place Inline Editing

Demonstrates compact dropdown embedding directly inside data table rows.

```html
<table class="table table-hover align-middle">
  <thead class="table-light">
    <tr>
      <th>User</th>
      <th>Email</th>
      <th style="width: 220px;">Role (Inline Edit)</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let member of teamMembers">
      <td class="fw-semibold">{{ member.name }}</td>
      <td>{{ member.email }}</td>
      <td>
        <ngb-select
          [options]="roleOptions"
          [(ngModel)]="member.role"
          size="small"
          optionLabel="label"
          optionValue="value"
          (onChange)="onRoleUpdated(member, $event.value)"
        >
        </ngb-select>
      </td>
    </tr>
  </tbody>
</table>
```

---

## 22. Bootstrap Modal Integration

Demonstrates using `appendTo="body"` to break out of modal dialog scroll boundaries and handling z-index correctly.

```html
<!-- Trigger Modal Button -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
  Open Edit Modal
</button>

<!-- Modal Dialog (data-bs-focus="false" allows body-appended dropdown searching) -->
<div class="modal fade" id="editModal" data-bs-focus="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Assign Department</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body overflow-hidden">
        <label class="form-label fw-semibold">Target Department:</label>
        <ngb-select
          [options]="departments"
          [(ngModel)]="selectedDept"
          optionLabel="name"
          appendTo="body"
          [filter]="true"
          placeholder="Select Department"
        >
        </ngb-select>
      </div>
    </div>
  </div>
</div>
```

---

## 23. Multi-Select with Custom Chip Template

Demonstrates fully customized chip badges rendering user profile images and colored status badges with an interactive close icon.

```html
<ngb-select
  [options]="collaborators"
  [(ngModel)]="selectedCollaborators"
  optionLabel="name"
  optionValue="id"
  [multiple]="true"
  display="chip"
  placeholder="Add team collaborators"
>
  <!-- Custom Chip Template -->
  <ng-template #chip let-user>
    <div class="d-inline-flex align-items-center gap-1">
      <img [src]="user.avatar" class="rounded-circle" width="18" height="18" />
      <span class="fw-semibold">{{ user.name }}</span>
      <span class="badge bg-primary-subtle text-primary ms-1 font-monospace">{{ user.team }}</span>
    </div>
  </ng-template>
</ngb-select>
```

---

## 24. Bootstrap Dark Mode & Theme Switching

Demonstrates component rendering in dark mode using Bootstrap 5.3+ `data-bs-theme="dark"`.

```html
<!-- Dark Theme Wrapper -->
<div class="p-4 rounded bg-dark text-light" data-bs-theme="dark">
  <h6 class="mb-3">Dark Mode Theme:</h6>
  <ngb-select
    [options]="themes"
    [(ngModel)]="activeTheme"
    optionLabel="label"
    optionValue="id"
    [showClear]="true"
    [filter]="true"
    placeholder="Select Dark Mode Option"
  >
  </ngb-select>
</div>
```

---

## 25. Accessibility (A11y) & Keyboard Traversal

Demonstrates WCAG compliant setup with screen reader labels and complete keyboard navigability.

```html
<div class="mb-3">
  <label id="paymentMethodLabel" class="form-label fw-bold">Choose Payment Method:</label>
  <ngb-select
    [options]="paymentMethods"
    [(ngModel)]="selectedPayment"
    ariaLabelledBy="paymentMethodLabel"
    optionLabel="name"
    optionValue="code"
    placeholder="Select Payment"
  >
  </ngb-select>
  <div class="form-text">
    Keyboard controls: <kbd>Space</kbd> or <kbd>Enter</kbd> to open, <kbd>Up</kbd>/<kbd>Down</kbd>
    to navigate, <kbd>Esc</kbd> to close.
  </div>
</div>
```

---

## 26. Form Reset & Dynamic Disabling

Demonstrates programmatic form resetting, setting disabled states dynamically, and observing clean UI synchronization.

```typescript
@Component({
  standalone: true,
  imports: [NgbSelectComponent, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="accountForm">
      <div class="mb-3">
        <label class="form-label fw-semibold">Subscription Plan:</label>
        <ngb-select
          [options]="plans"
          formControlName="plan"
          optionLabel="name"
          optionValue="id"
          placeholder="Select Plan"
        >
        </ngb-select>
      </div>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" (click)="toggleDisable()">
          {{ accountForm.get('plan')?.disabled ? 'Enable Select' : 'Disable Select' }}
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger" (click)="resetForm()">
          Reset to Default
        </button>
      </div>
    </form>
  `,
})
export class FormResetDemoComponent {
  plans = [
    { id: 'free', name: 'Free Tier' },
    { id: 'pro', name: 'Professional ($29/mo)' },
    { id: 'enterprise', name: 'Enterprise' },
  ];

  accountForm = new FormGroup({
    plan: new FormControl('pro'),
  });

  toggleDisable(): void {
    const ctrl = this.accountForm.get('plan');
    ctrl?.disabled ? ctrl.enable() : ctrl?.disable();
  }

  resetForm(): void {
    this.accountForm.reset({ plan: 'free' });
  }
}
```

---

## 27. Hierarchical Grouped Multi-Select

Demonstrates multi-selection within categorized options with item count summaries.

```html
<ngb-select
  [options]="groupedPermissions"
  [(ngModel)]="selectedPermissions"
  [group]="true"
  optionGroupLabel="category"
  optionGroupChildren="permissions"
  optionLabel="name"
  optionValue="key"
  [multiple]="true"
  [showSelectAll]="true"
  display="chip"
  placeholder="Assign categorized permissions"
>
</ngb-select>
```
