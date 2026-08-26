import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbSelectComponent } from '../lib/ngb-select.component';
import { SelectOption, SelectFilterMatchMode } from '../lib/ngb-select.interface';
import { APP_VERSION } from '../version';

interface City {
  name: string;
  code: string;
}

interface Country {
  name: string;
  code: string;
  flag: string;
  currency: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbSelectComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // App Version bound to templates
  public readonly appVersion = APP_VERSION;

  // Theme state
  isDarkMode = false;

  // API Reference active tab state
  activeApiTab: 'inputs' | 'outputs' | 'templates' = 'inputs';

  // 1. Basic (Primitives & Objects)
  primitiveCities: string[] = ['New York', 'Rome', 'London', 'Istanbul', 'Paris', 'Tokyo'];
  selectedPrimitiveCity: string = 'Rome';

  objectCities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Tokyo', code: 'TOK' }
  ];
  selectedObjectCity: City | null = this.objectCities[1];

  // 2. Reactive Forms
  userForm = new FormGroup({
    city: new FormControl<City | null>(null, [Validators.required])
  });

  // 3. Multi-Select (Comma & Chips)
  selectedMultiCities: City[] = [this.objectCities[0], this.objectCities[1]];
  selectedChipsCities: City[] = [this.objectCities[0], this.objectCities[2], this.objectCities[4]];
  selectedAllCountries: Country[] = [];
  selectedLimitedCities: City[] = [this.objectCities[0]];

  // 4. Filtering & Match Modes
  countries: Country[] = [
    { name: 'Australia', code: 'AU', flag: '🇦🇺', currency: 'AUD' },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷', currency: 'BRL' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦', currency: 'CAD' },
    { name: 'Egypt', code: 'EG', flag: '🇪🇬', currency: 'EGP' },
    { name: 'France', code: 'FR', flag: '🇫🇷', currency: 'EUR' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', currency: 'EUR' },
    { name: 'India', code: 'IN', flag: '🇮🇳', currency: 'INR' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵', currency: 'JPY' },
    { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', currency: 'SAR' },
    { name: 'United Kingdom', code: 'UK', flag: '🇬🇧', currency: 'GBP' },
    { name: 'United States', code: 'US', flag: '🇺🇸', currency: 'USD' }
  ];
  selectedCountryFilter: string | null = 'SA';
  filterMatchMode: SelectFilterMatchMode = 'contains';

  // 5. Custom Templating
  selectedCountryTemplate: Country | null = this.countries[8];

  // 6. Grouped Options
  groupedCars = [
    {
      label: 'Germany',
      value: 'de',
      items: [
        { label: 'Audi', value: 'Audi' },
        { label: 'BMW', value: 'BMW' },
        { label: 'Mercedes-Benz', value: 'Mercedes' },
        { label: 'Porsche', value: 'Porsche' }
      ]
    },
    {
      label: 'USA',
      value: 'us',
      items: [
        { label: 'Cadillac', value: 'Cadillac' },
        { label: 'Chevrolet', value: 'Chevrolet' },
        { label: 'Ford', value: 'Ford' },
        { label: 'Tesla', value: 'Tesla' }
      ]
    },
    {
      label: 'Japan',
      value: 'jp',
      items: [
        { label: 'Honda', value: 'Honda' },
        { label: 'Nissan', value: 'Nissan' },
        { label: 'Toyota', value: 'Toyota' }
      ]
    }
  ];
  selectedGroupedCar: string | null = 'Porsche';

  // 7. Editable (Combobox)
  editableCity: string = 'San Francisco';

  // 8. Float Label
  floatCity: City | null = null;

  // 9. Sizes & Variants
  sizeCity: City | null = this.objectCities[0];

  // 10. Loading State (Simulated API Fetch)
  loadingCities: City[] = [];
  isLoading = false;
  selectedLoadingCity: string | null = null;

  // 11. Large Dataset / Virtual Scrolling Alternative
  largeDataset: { label: string; value: number }[] = [];
  selectedLargeItem: number | null = null;

  // 12. Focus on Open Index Example
  focusOpenIndex: number = 3; // Index 3 is 'Istanbul'
  selectedFocusCity: City | null = null;

  // 13. Angular Signals Binding
  signalCity = signal<string>('TOK');

  // Code Tab state for examples
  activeTabs: { [key: string]: 'demo' | 'html' | 'ts' } = {};
  copiedSection: string | null = null;

  ngOnInit(): void {
    for (let i = 1; i <= 1000; i++) {
      this.largeDataset.push({ label: `Option Item #${i}`, value: i });
    }
    this.reloadDynamicData();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
  }

  reloadDynamicData(): void {
    this.isLoading = true;
    this.loadingCities = [];
    setTimeout(() => {
      this.loadingCities = [...this.objectCities];
      this.isLoading = false;
    }, 1500);
  }

  setTab(section: string, tab: 'demo' | 'html' | 'ts'): void {
    this.activeTabs[section] = tab;
  }

  getTab(section: string): 'demo' | 'html' | 'ts' {
    return this.activeTabs[section] || 'demo';
  }

  copyCode(code: string, section: string): void {
    navigator.clipboard.writeText(code);
    this.copiedSection = section;
    setTimeout(() => {
      this.copiedSection = null;
    }, 2000);
  }

  submitReactiveForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      alert('Form Valid & Submitted: ' + JSON.stringify(this.userForm.value));
    }
  }

  // --- Code Snippet Helpers ---
  snippets = {
    basicHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCity" 
  optionLabel="name" 
  placeholder="Select a City"
  [fluid]="true">
</ngb-select>`,

    basicTs: `cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Paris', code: 'PRS' }
];
selectedCity = null;`,

    multiCommaHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCities" 
  optionLabel="name" 
  [multiple]="true"
  [display]="'comma'"
  [maxSelectedLabels]="3"
  [showClear]="true"
  placeholder="Select Multiple Cities"
  [fluid]="true">
</ngb-select>`,

    multiChipsHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCities" 
  optionLabel="name" 
  [multiple]="true"
  [display]="'chip'"
  [showClear]="true"
  placeholder="Select Cities (Chips Mode)"
  [fluid]="true">
</ngb-select>`,

    selectAllHtml: `<ngb-select 
  [options]="countries" 
  [(ngModel)]="selectedCountries" 
  optionLabel="name" 
  [multiple]="true"
  [showSelectAll]="true"
  [filter]="true"
  placeholder="Select All Countries"
  [fluid]="true">
</ngb-select>`,

    focusOnOpenHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCity" 
  optionLabel="name" 
  [focusOnOpen]="3" 
  placeholder="Open to auto-focus index 3 (Istanbul)"
  [fluid]="true">
</ngb-select>`,

    reactiveHtml: `<form [formGroup]="userForm" (ngSubmit)="submit()">
  <ngb-select 
    [options]="cities" 
    formControlName="city" 
    optionLabel="name"
    [invalid]="userForm.get('city')?.invalid && userForm.get('city')?.touched"
    [showClear]="true"
    placeholder="Select a City"
    [fluid]="true">
  </ngb-select>
  <button type="submit" class="btn btn-primary mt-2">Submit</button>
</form>`,

    filterHtml: `<ngb-select 
  [options]="countries" 
  [(ngModel)]="selectedCountry" 
  optionLabel="name" 
  optionValue="code"
  [filter]="true" 
  filterBy="name,code"
  filterMatchMode="contains"
  filterPlaceholder="Search country..."
  [showClear]="true"
  placeholder="Select a Country"
  [fluid]="true">
</ngb-select>`,

    templateHtml: `<ngb-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [fluid]="true">
  <!-- Selected Item Template -->
  <ng-template #selectedItem let-country>
    <div class="d-flex align-items-center gap-2">
      <span class="fs-5">{{ country.flag }}</span>
      <span class="fw-semibold">{{ country.name }}</span>
    </div>
  </ng-template>

  <!-- Option Item Template -->
  <ng-template #item let-country>
    <div class="d-flex align-items-center justify-content-between w-100 py-1">
      <div class="d-flex align-items-center gap-2">
        <span class="fs-5">{{ country.flag }}</span>
        <span>{{ country.name }}</span>
      </div>
      <span class="badge bg-secondary-subtle text-secondary-emphasis">{{ country.currency }}</span>
    </div>
  </ng-template>
</ngb-select>`,

    groupHtml: `<ngb-select 
  [options]="groupedCars" 
  [(ngModel)]="selectedCar" 
  [group]="true"
  optionGroupLabel="label" 
  optionGroupChildren="items"
  placeholder="Select a Car"
  [fluid]="true">
</ngb-select>`,

    editableHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="customCity" 
  optionLabel="name" 
  optionValue="name"
  [editable]="true" 
  [showClear]="true"
  placeholder="Type custom or select"
  [fluid]="true">
</ngb-select>`,

    floatLabelHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCity" 
  optionLabel="name"
  [floatLabel]="true" 
  placeholder="Destination City"
  [fluid]="true">
</ngb-select>`,

    signalsHtml: `<!-- Template -->
<ngb-select 
  [options]="cities" 
  [ngModel]="signalCity()" 
  (ngModelChange)="signalCity.set($event)"
  optionLabel="name" 
  optionValue="code"
  [fluid]="true">
</ngb-select>

<!-- Component TS -->
signalCity = signal<string>('TOK');`
  };
}
