# Ngb-Select (Angular Bootstrap Select Component)

A comprehensive, lightweight Angular Standalone select component that utilizes **pure Bootstrap 5 classes** (no external UI libraries required). It covers all advanced features found in the PrimeNG Select component, optimized for standard Bootstrap environments.

## 🚀 Features at a Glance
- 📦 **Standalone Architecture** - Modern Angular 15+ design, easy to import.
- 🎨 **Pure Bootstrap 5** - Uses `.form-select`, `.dropdown-menu`, and `.list-group` internally. No extra CSS payload.
- 🔍 **Filtering** - Fast, client-side, case-insensitive search capabilities.
- 🗂️ **Grouping** - Categorize options with nested headers.
- 🛠️ **Advanced Templating** - Replace default text with fully custom DOM for items, headers, footers, and selected states.
- ⌨️ **Forms Native & Signals** - Implements `ControlValueAccessor` for seamless `ngModel`, `FormControl` (Reactive Forms), and modern Angular `model()` Signal support.
- 🛡️ **Robust Fallbacks** - Defensively programmed to gracefully handle `null`, `undefined`, and empty strings across inputs.
- ♿ **Accessible** - ARIA roles implemented (`combobox`, `listbox`, `option`) alongside keyboard navigation.

## 📦 Installation

Install the library via NPM:
```bash
npm install ngb-select
```

Ensure Bootstrap 5 CSS is included in your project, typically inside `angular.json`:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
```

## 💻 Usage Examples

### 1. Basic Setup (Template Driven)
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbSelectComponent } from 'ngb-select';

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
  selectedCity: string;
}
```

### 2. Filtering and Clear Icon
Enable the internal search bar and clear button.
```html
<ngb-select 
  [options]="countries" 
  [(ngModel)]="selectedCountry" 
  optionLabel="name" 
  [filter]="true" 
  filterBy="name,code" 
  filterPlaceholder="Search countries..."
  [showClear]="true"
  placeholder="Select a Country">
</ngb-select>
```

### 3. Custom Templating
Override the default rendering of options and the selected view using `<ng-template>`.
```html
<ngb-select [options]="users" [(ngModel)]="selectedUser">
  
  <!-- Custom Selected Item -->
  <ng-template #selectedItem let-user>
    <div class="d-flex align-items-center">
      <img [src]="user.avatar" class="rounded-circle me-2" width="20">
      <strong>{{ user.name }}</strong>
    </div>
  </ng-template>

  <!-- Custom Dropdown Item -->
  <ng-template #item let-user>
    <div class="d-flex flex-column">
      <span>{{ user.name }}</span>
      <small class="text-muted">{{ user.email }}</small>
    </div>
  </ng-template>

</ngb-select>
```

### 4. Grouping
Group options using the `optionGroupChildren` property.
```typescript
groupedCities = [
  {
    label: 'Germany', code: 'DE',
    items: [ { label: 'Berlin', value: 'Berlin' }, { label: 'Frankfurt', value: 'Frankfurt' } ]
  },
  {
    label: 'USA', code: 'US',
    items: [ { label: 'Chicago', value: 'Chicago' }, { label: 'Los Angeles', value: 'Los Angeles' } ]
  }
];
```
```html
<ngb-select 
  [options]="groupedCities" 
  [group]="true" 
  optionGroupLabel="label" 
  optionGroupChildren="items">
### 5. Multi-Select with Checkboxes & Chips
Enable multiple selection, "Select All" header, and removable chip badges:
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

## 📖 Deep-Dive Documentation
For full API property lists, architecture decisions, and implementation strategies, refer to the [docs/](./docs) directory:
- [Architecture & Features](./01-architecture-and-features.md)
- [API & Interfaces](./02-api-and-interfaces.md)
- [Implementation Code](./03-implementation-steps.md)
- [Test Strategy](./04-test-cases.md)
- [CI/CD Configuration](./05-cicd-pipeline.md)
- [Git & StackBlitz](./06-git-and-stackblitz.md)

## 🧪 Live Preview & Sandbox
- [View GitHub Pages Demo](https://{username}.github.io/ngb-select/)
- [Play with it on StackBlitz](https://stackblitz.com/github/{username}/ngb-select/tree/main)

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Follow the **Conventional Commits** standard for your commit messages.
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Ensure all GitHub Actions checks (linting, tests) pass before requesting a review.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
