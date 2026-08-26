# 07. Comprehensive Demo Showcase Examples

This document serves as the complete catalog of demo examples for the `ngb-select` component. Each example includes the template markup, component TypeScript logic, and feature explanation.

---

## Catalog Overview

| # | Demo Title | Key Features Demonstrated |
| :--- | :--- | :--- |
| **01** | [Basic Selection](#01-basic-selection) | Primitives, objects, `optionLabel`, `optionValue` |
| **02** | [Modern Signals & Template Forms](#02-modern-signals--template-forms) | `model()` Signals, `[(ngModel)]` |
| **03** | [Reactive Forms & Validation](#03-reactive-forms--validation) | `FormGroup`, `FormControl`, `[invalid]`, Bootstrap validation classes |
| **04** | [Search Filtering & Match Modes](#04-search-filtering--match-modes) | `filter`, `filterBy`, `filterMatchMode`, `filterPlaceholder` |
| **05** | [Clear Icon](#05-clear-icon) | `showClear`, `(onClear)` event |
| **06** | [Sizes, Variants & Floating Labels](#06-sizes-variants--floating-labels) | `size="small\|large"`, `variant="filled"`, `floatLabel`, `fluid` |
| **07** | [Custom Item & Selected Templating](#07-custom-item--selected-templating) | `#item`, `#selectedItem`, avatars, badges |
| **08** | [Header, Footer & Empty Templates](#08-header-footer--empty-templates) | `#header`, `#footer`, `#empty` |
| **09** | [Grouped Options](#09-grouped-options) | `group="true"`, `optionGroupLabel`, `optionGroupChildren` |
| **10** | [Multi-Select (Comma Summary)](#10-multi-select-comma-summary) | `multiple="true"`, `maxSelectedLabels`, `selectedItemsLabel` |
| **11** | [Multi-Select with Chips & Limit](#11-multi-select-with-chips--limit) | `display="chip"`, `selectionLimit`, `(onRemoveChip)` |
| **12** | [Multi-Select with Select All](#12-multi-select-with-select-all) | `showSelectAll="true"`, `selectAllLabel`, `(onSelectAllChange)` |
| **13** | [Editable Combobox](#13-editable-combobox) | `editable="true"`, custom user typing, `maxLength` |
| **14** | [Component States](#14-component-states) | `disabled`, `readonly`, `loading` (spinner) |
| **15** | [Lazy Loading & Infinite Scroll](#15-lazy-loading--infinite-scroll) | `lazy="true"`, `(onLazyLoad)` |
| **16** | [Overlay Append to Body](#16-overlay-append-to-body) | `appendTo="body"`, modal dialog escape |
| **17** | [RTL & Arabic (AR) Showcase](#17-rtl--arabic-ar-showcase) | `dir="rtl"`, Arabic datasets, Alef/Tashkeel normalization |

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
          placeholder="Select a city">
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
          placeholder="Select a city">
        </ngb-select>
        <div class="form-text">Selected code: {{ selectedCityCode }}</div>
      </div>
    </div>
  `
})
export class BasicDemoComponent {
  simpleCities = ['New York', 'London', 'Paris', 'Tokyo'];
  selectedSimpleCity: string | null = null;

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Tokyo', code: 'TKO' }
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
      placeholder="Select Fruit">
    </ngb-select>
    <button class="btn btn-sm btn-outline-secondary mt-2" (click)="resetSignal()">
      Reset Signal to Apple
    </button>
  `
})
export class SignalDemoComponent {
  fruits = [
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Orange' },
    { id: 3, label: 'Banana' }
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
          placeholder="Select Country">
        </ngb-select>
        <div *ngIf="userForm.get('country')?.invalid && userForm.get('country')?.touched" 
             class="text-danger small mt-1">
          Country selection is required.
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-sm" [disabled]="userForm.invalid">Submit</button>
    </form>
  `
})
export class ReactiveValidationDemoComponent {
  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Germany', code: 'DE' },
    { name: 'Japan', code: 'JP' }
  ];

  userForm = new FormGroup({
    country: new FormControl(null, [Validators.required])
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
  <!-- StartsWith filter -->
  <div class="col-md-6">
    <label class="form-label fw-semibold">Starts With Filter:</label>
    <ngb-select 
      [options]="cars" 
      [(ngModel)]="selectedCar" 
      optionLabel="name"
      [filter]="true" 
      filterMatchMode="startsWith"
      filterPlaceholder="Filter by name starts with..."
      placeholder="Select Car">
    </ngb-select>
  </div>

  <!-- Multi-field Contains filter -->
  <div class="col-md-6">
    <label class="form-label fw-semibold">Search by Name or Code (Contains):</label>
    <ngb-select 
      [options]="cars" 
      [(ngModel)]="selectedCar2" 
      optionLabel="name"
      [filter]="true" 
      filterBy="name,vin"
      filterMatchMode="contains"
      filterPlaceholder="Search name or VIN..."
      placeholder="Select Car">
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
  (onClear)="onDepartmentCleared()">
</ngb-select>
```

---

## 06. Sizes, Variants & Floating Labels

Demonstrates small/large sizing, filled style variants, and Bootstrap 5 `.form-floating`.

```html
<div class="row g-3 align-items-end">
  <!-- Small Size -->
  <div class="col-md-4">
    <label class="form-label small">Small Size (.form-select-sm):</label>
    <ngb-select [options]="options" [(ngModel)]="val1" size="small" placeholder="Small Select"></ngb-select>
  </div>

  <!-- Large Size Filled Variant -->
  <div class="col-md-4">
    <label class="form-label">Large Size & Filled Variant:</label>
    <ngb-select [options]="options" [(ngModel)]="val2" size="large" variant="filled" placeholder="Large Filled"></ngb-select>
  </div>

  <!-- Float Label -->
  <div class="col-md-4">
    <ngb-select [options]="options" [(ngModel)]="val3" [floatLabel]="true" placeholder="Floating Label"></ngb-select>
  </div>
</div>
```

---

## 07. Custom Item & Selected Templating

Customizes dropdown items with user avatars and selected view layout.

```html
<ngb-select [options]="users" [(ngModel)]="selectedUser" optionLabel="name" placeholder="Assign user">
  <!-- Trigger Template -->
  <ng-template #selectedItem let-user>
    <div class="d-flex align-items-center gap-2">
      <img [src]="user.avatar" class="rounded-circle" width="22" height="22">
      <span class="fw-semibold">{{ user.name }}</span>
      <span class="badge bg-secondary-subtle text-secondary ms-auto">{{ user.role }}</span>
    </div>
  </ng-template>

  <!-- Dropdown List Item Template -->
  <ng-template #item let-user>
    <div class="d-flex align-items-center justify-content-between w-100 py-1">
      <div class="d-flex align-items-center gap-2">
        <img [src]="user.avatar" class="rounded-circle" width="30" height="30">
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
<ngb-select [options]="products" [(ngModel)]="selectedProduct" [filter]="true" placeholder="Select Product">
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
  placeholder="Select a vehicle">
</ngb-select>
```

---

## 10. Multi-Select (Comma Summary)

Select multiple options with an automatic summary count when selection exceeds `maxSelectedLabels`.

```html
<ngb-select 
  [options]="technologies" 
  [(ngModel)]="selectedTech" 
  optionLabel="name" 
  optionValue="id"
  [multiple]="true"
  [maxSelectedLabels]="2"
  selectedItemsLabel="{0} technologies chosen"
  [showClear]="true"
  placeholder="Choose technologies">
</ngb-select>
```

---

## 11. Multi-Select with Chips & Limit

Renders selected items as removable Bootstrap badges, enforcing a max selection limit.

```html
<ngb-select 
  [options]="skills" 
  [(ngModel)]="selectedSkills" 
  optionLabel="name" 
  optionValue="id"
  [multiple]="true"
  display="chip"
  [selectionLimit]="3"
  placeholder="Pick top 3 skills (Max 3)"
  (onRemoveChip)="onSkillRemoved($event)">
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
  (onSelectAllChange)="onPermissionsAllToggled($event)">
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
  placeholder="Choose tag or type custom...">
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
  (onLazyLoad)="fetchNextBatch()">
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
    placeholder="Select without modal clipping">
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
        emptyFilterMessage="لم يتم العثور على نتائج مطابقة">
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
        placeholder="اختر المدن">
      </ngb-select>
    </div>
  </div>
</div>
```
