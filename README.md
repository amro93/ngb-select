# Ngb-Select (Angular Bootstrap Select Component)

[![NPM Version](https://img.shields.io/npm/v/ngb-select.svg)](https://www.npmjs.com/package/ngb-select)
[![CI/CD Pipeline](https://github.com/amro/ngb-select/actions/workflows/deploy.yml/badge.svg)](https://github.com/amro/ngb-select/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, lightweight Angular Standalone select component that utilizes **pure Bootstrap 5 classes** (no external UI libraries required). It covers all advanced features found in the PrimeNG Select component, optimized for standard Bootstrap environments.

## 🚀 Features at a Glance
- 📦 **Standalone Architecture** - Modern Angular 15+ design, easy to import without NgModules.
- 🎨 **Pure Bootstrap 5** - Uses `.form-select`, `.dropdown-menu`, and `.list-group` internally. No extra CSS payload.
- 🔍 **Filtering & Match Modes** - Fast, client-side search supporting `contains`, `startsWith`, `endsWith`, `equals`.
- 🗂️ **Grouping** - Categorize options with nested headers.
- 🛠️ **Advanced Templating** - Replace default text with fully custom DOM for items, headers, footers, and selected states.
- ⌨️ **Forms Native & Signals** - Implements `ControlValueAccessor` for seamless `ngModel`, `FormControl` (Reactive Forms), and modern Angular `model()` Signal support.
- 🛡️ **Robust Fallbacks** - Defensively programmed to gracefully handle `null`, `undefined`, and empty strings across inputs.
- ♿ **Accessible** - ARIA roles implemented (`combobox`, `listbox`, `option`) alongside keyboard navigation.
- ⚡ **Editable Combobox** - Allows custom user typing directly into the select input.
- 🎯 **Focus on Open** - Programmatically scroll and focus a specific option index when the popup opens.

## 📦 Installation

Install `ngb-select` along with peer dependencies:
```bash
npm install ngb-select bootstrap bootstrap-icons
```

Ensure Bootstrap 5 CSS is included in your `angular.json` or `src/styles.scss`:
```scss
@import "bootstrap/scss/bootstrap";
@import "bootstrap-icons/font/bootstrap-icons.css";
```

## 💻 Usage Examples

### 1. Basic Setup (Template Driven)
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbSelectComponent } from './lib/ngb-select.component';

@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule],
  template: `
    <ngb-select 
      [options]="cities" 
      [(ngModel)]="selectedCity" 
      optionLabel="name" 
      optionValue="code"
      placeholder="Select a City">
    </ngb-select>
  `
})
export class AppComponent {
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' }
  ];
  selectedCity: string = 'NY';
}
```

### 2. Reactive Forms with Validation
```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbSelectComponent } from './lib/ngb-select.component';

@Component({
  standalone: true,
  imports: [NgbSelectComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ngb-select 
        [options]="countries" 
        formControlName="selectedCountry" 
        optionLabel="name" 
        optionValue="code"
        [invalid]="form.get('selectedCountry')?.invalid && form.get('selectedCountry')?.touched"
        [showClear]="true"
        placeholder="Select Country">
      </ngb-select>
    </form>
  `
})
export class AppComponent {
  form = new FormGroup({
    selectedCountry: new FormControl(null, [Validators.required])
  });
}
```

### 3. Filtering and Custom Search Modes
```html
<ngb-select 
  [options]="countries" 
  [(ngModel)]="selectedCountry" 
  optionLabel="name" 
  [filter]="true" 
  filterBy="name,code" 
  filterMatchMode="startsWith"
  filterPlaceholder="Search countries..."
  [showClear]="true"
  placeholder="Select a Country">
</ngb-select>
```

### 4. Custom Templating
Override the default rendering of options and the selected view using `<ng-template>`:
```html
<ngb-select [options]="users" [(ngModel)]="selectedUser" optionLabel="name">
  
  <!-- Custom Selected Item -->
  <ng-template #selectedItem let-user>
    <div class="d-flex align-items-center gap-2">
      <img [src]="user.avatar" class="rounded-circle" width="22" height="22">
      <strong>{{ user.name }}</strong>
    </div>
  </ng-template>

  <!-- Custom Dropdown Item -->
  <ng-template #item let-user>
    <div class="d-flex align-items-center justify-content-between w-100 py-1">
      <div class="d-flex align-items-center gap-2">
        <img [src]="user.avatar" class="rounded-circle" width="28" height="28">
        <div>
          <div class="fw-semibold">{{ user.name }}</div>
          <small class="text-muted">{{ user.email }}</small>
        </div>
      </div>
      <span class="badge bg-primary-subtle text-primary-emphasis">{{ user.role }}</span>
    </div>
  </ng-template>

</ngb-select>
```

### 5. Grouped Options
```html
<ngb-select 
  [options]="groupedCars" 
  [(ngModel)]="selectedCar" 
  [group]="true" 
  optionGroupLabel="brand" 
  optionGroupChildren="cars"
  optionLabel="name" 
  optionValue="value"
  placeholder="Choose vehicle brand">
</ngb-select>
```

### 6. Multi-Select with Checkboxes & Chips
Enable multiple selection, "Select All" checkbox header, and removable chip badges:
```html
<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCities" 
  optionLabel="name" 
  optionValue="code"
  [multiple]="true"
  display="chip"
  [showSelectAll]="true"
  [filter]="true"
  placeholder="Select Cities">
</ngb-select>
```

### 7. RTL (Right-to-Left) & Arabic Support
Full compatibility with Bootstrap 5 RTL and Arabic search text normalization:
```html
<div dir="rtl" lang="ar">
  <ngb-select 
    [options]="arabicCountries" 
    [(ngModel)]="selectedCountry" 
    optionLabel="name" 
    optionValue="code"
    [filter]="true"
    filterPlaceholder="ابحث عن دولة..."
    placeholder="اختر الدولة"
    emptyMessage="لا توجد نتائج">
  </ngb-select>
</div>
```

## 📖 Deep-Dive Documentation
For full API property lists, architecture decisions, and implementation strategies, refer to the [docs/](./docs) directory:
- [01. Architecture & Features](./docs/01-architecture-and-features.md)
- [02. API & Interfaces](./docs/02-api-and-interfaces.md)
- [03. Implementation Code](./docs/03-implementation-steps.md)
- [04. Test Strategy](./docs/04-test-cases.md)
- [05. CI/CD Configuration](./docs/05-cicd-pipeline.md)
- [06. Git & StackBlitz](./docs/06-git-and-stackblitz.md)
- [07. Demo Examples Catalog](./docs/07-demo-examples.md)

## 🧪 Live Preview & Sandbox
- [View GitHub Pages Live Demo](https://amro.github.io/ngb-select/)
- [Play with it on StackBlitz](https://stackblitz.com/github/amro/ngb-select/tree/main)

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Follow the **Conventional Commits** standard for your commit messages.
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Ensure all GitHub Actions checks (linting, tests) pass before requesting a review.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
