import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbSelectComponent } from '../lib/ngb-select.component';
import {
  SelectOption,
  SelectFilterMatchMode,
  FocusOnOpenStrategy,
} from '../lib/ngb-select.interface';
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
  styleUrl: './app.scss',
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
    { name: 'Tokyo', code: 'TOK' },
  ];
  selectedObjectCity: City | null = this.objectCities[1];

  // 2. Reactive Forms
  userForm = new FormGroup({
    city: new FormControl<City | null>(null, [Validators.required]),
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
    { name: 'United States', code: 'US', flag: '🇺🇸', currency: 'USD' },
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
        { label: 'Porsche', value: 'Porsche' },
      ],
    },
    {
      label: 'USA',
      value: 'us',
      items: [
        { label: 'Cadillac', value: 'Cadillac' },
        { label: 'Chevrolet', value: 'Chevrolet' },
        { label: 'Ford', value: 'Ford' },
        { label: 'Tesla', value: 'Tesla' },
      ],
    },
    {
      label: 'Japan',
      value: 'jp',
      items: [
        { label: 'Honda', value: 'Honda' },
        { label: 'Nissan', value: 'Nissan' },
        { label: 'Toyota', value: 'Toyota' },
      ],
    },
  ];
  selectedGroupedCar: string | null = 'Porsche';

  // 7. Editable (Combobox)
  editableCity: string = 'San Francisco';

  // Team Members for Advanced Label & Item Templating Cases
  members = [
    {
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      role: 'Lead Architect',
      status: 'online',
      badge: 'bg-primary',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Frontend Engineer',
      status: 'busy',
      badge: 'bg-danger',
    },
    {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      role: 'Product Designer',
      status: 'away',
      badge: 'bg-warning text-dark',
    },
    {
      name: 'Elena Rostova',
      email: 'elena@example.com',
      role: 'DevOps Engineer',
      status: 'offline',
      badge: 'bg-secondary',
    },
  ];
  selectedMember: any = this.members[0];
  selectedCustomChips: any[] = [this.countries[0], this.countries[2]];
  selectedMultiSummary: any[] = [this.countries[0], this.countries[1], this.countries[2]];

  // 8. Float Label Variants ('on' | 'in' | 'over')
  floatCityOn: City | null = null;
  floatCityIn: City | null = this.objectCities[1];
  floatCityOver: City | null = null;
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
  focusOpenStrategy: FocusOnOpenStrategy = 'always';
  selectedFocusCity: City | null = null;

  // 13. Angular Signals Binding
  signalCity = signal<string>('TOK');

  // 14. Arabic (AR) RTL Showcase
  arabicCountries = [
    { name: 'المملكة العربية السعودية', code: 'SA' },
    { name: 'الإمارات العربية المتحدة', code: 'AE' },
    { name: 'جمهورية مصر العربية', code: 'EG' },
    { name: 'المملكة الأردنية الهاشمية', code: 'JO' },
    { name: 'دولة الكويت', code: 'KW' },
    { name: 'دولة قطر', code: 'QA' },
    { name: 'سلطنة عمان', code: 'OM' },
  ];
  selectedArabicCountry: string = 'SA';

  arabicCities = [
    { id: 1, name: 'الرياض' },
    { id: 2, name: 'دبي' },
    { id: 3, name: 'القاهرة' },
    { id: 4, name: 'عمان' },
    { id: 5, name: 'الدوحة' },
    { id: 6, name: 'مسقط' },
  ];
  selectedArabicCities: number[] = [1, 2];

  arabicGroupedRegions = [
    {
      region: 'دول الخليج العربي',
      cities: [
        { name: 'الرياض', code: 'RUH' },
        { name: 'أبوظبي', code: 'AUH' },
        { name: 'الكويت', code: 'KWI' },
      ],
    },
    {
      region: 'بلاد الشام وشمال أفريقيا',
      cities: [
        { name: 'القاهرة', code: 'CAI' },
        { name: 'عمان', code: 'AMM' },
        { name: 'بيروت', code: 'BEY' },
      ],
    },
  ];
  selectedArabicRegionCity: any = null;

  // 15. In-Trigger Search
  selectedTriggerCity: City | null = null;

  // 16. Searchable Multi-Select (Demo 10 & 11)
  selectedSearchableMulti: Country[] = [this.countries[0], this.countries[8]];

  // 18. Cascading / Dependent Dropdowns (Demo 18)
  cascadingCountries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Germany', code: 'DE' },
  ];
  cascadingAllCities = [
    { id: 1, countryCode: 'US', name: 'New York' },
    { id: 2, countryCode: 'US', name: 'San Francisco' },
    { id: 3, countryCode: 'UK', name: 'London' },
    { id: 4, countryCode: 'UK', name: 'Manchester' },
    { id: 5, countryCode: 'DE', name: 'Berlin' },
    { id: 6, countryCode: 'DE', name: 'Munich' },
  ];
  selectedCascadingCountry: string | null = null;
  selectedCascadingCity: number | null = null;
  cascadingAvailableCities: any[] = [];

  onCascadingCountryChange(countryCode: string | null): void {
    this.selectedCascadingCity = null;
    if (countryCode) {
      this.cascadingAvailableCities = this.cascadingAllCities.filter(
        (c) => c.countryCode === countryCode,
      );
    } else {
      this.cascadingAvailableCities = [];
    }
  }

  // 19. Server-Side Debounced Async Search (Demo 19)
  asyncSearchResults: any[] = [];
  selectedAsyncUser: number | null = null;
  isAsyncSearching = false;
  private asyncSearchTimeout: any = null;

  onAsyncSearchFilter(query: string): void {
    if (this.asyncSearchTimeout) clearTimeout(this.asyncSearchTimeout);
    if (!query || query.length < 2) {
      this.asyncSearchResults = [];
      this.isAsyncSearching = false;
      return;
    }
    this.isAsyncSearching = true;
    this.asyncSearchTimeout = setTimeout(() => {
      this.asyncSearchResults = [
        { id: 101, login: `${query}_dev`, role: 'Senior Developer' },
        { id: 102, login: `${query}_lead`, role: 'Team Lead' },
        { id: 103, login: `${query}_architect`, role: 'Cloud Architect' },
      ];
      this.isAsyncSearching = false;
    }, 400);
  }

  // 20. Custom Icon Templates (Demo 20)
  browsers = [
    { id: 'chrome', name: 'Google Chrome', engine: 'Blink' },
    { id: 'firefox', name: 'Mozilla Firefox', engine: 'Gecko' },
    { id: 'safari', name: 'Apple Safari', engine: 'WebKit' },
    { id: 'edge', name: 'Microsoft Edge', engine: 'Blink' },
  ];
  selectedBrowser: string | null = 'chrome';

  // 21. Table Cell In-Place Inline Editing (Demo 21)
  tableMembers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'editor' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer' },
  ];
  roleOptions = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];

  // 22. Bootstrap Modal Dialog Integration (Demo 22)
  selectedModalDept: string | null = 'Engineering';
  departments = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Product Design' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Sales & Growth' },
  ];

  // 23. Multi-Select with Custom Chip Template (Demo 23)
  collaborators = [
    {
      id: 1,
      name: 'Sarah Connor',
      team: 'Platform',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces',
    },
    {
      id: 2,
      name: 'John Doe',
      team: 'Mobile',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces',
    },
    {
      id: 3,
      name: 'Alex Rivera',
      team: 'Core UI',
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces',
    },
  ];
  selectedCollaborators: number[] = [1, 2];

  // 24. Dark Mode Theme Switching (Demo 24)
  themeOptions = [
    { id: 'light', label: 'Light Theme' },
    { id: 'dark', label: 'Dark Theme' },
    { id: 'system', label: 'System Default' },
  ];
  activeDemoTheme: string = 'dark';

  // 25. Accessibility & Keyboard Traversal (Demo 25)
  paymentMethods = [
    { name: 'Credit / Debit Card', code: 'cc' },
    { name: 'PayPal', code: 'pp' },
    { name: 'Apple Pay / Google Pay', code: 'wallet' },
    { name: 'Bank Wire Transfer', code: 'bank' },
  ];
  selectedPayment: string | null = 'cc';

  // 26. Form Reset & Dynamic Disabling (Demo 26)
  accountForm = new FormGroup({
    plan: new FormControl('pro', [Validators.required]),
  });
  plans = [
    { id: 'free', name: 'Free Starter' },
    { id: 'pro', name: 'Professional ($29/mo)' },
    { id: 'enterprise', name: 'Enterprise Cloud' },
  ];

  toggleAccountPlanDisable(): void {
    const ctrl = this.accountForm.get('plan');
    if (ctrl?.disabled) {
      ctrl.enable();
    } else {
      ctrl?.disable();
    }
  }

  resetAccountPlanForm(): void {
    this.accountForm.reset({ plan: 'free' });
  }

  // 27. Hierarchical Grouped Multi-Select (Demo 27)
  groupedPermissions = [
    {
      category: 'User Management',
      permissions: [
        { name: 'View Users', key: 'usr_view' },
        { name: 'Create Users', key: 'usr_create' },
        { name: 'Delete Users', key: 'usr_del' },
      ],
    },
    {
      category: 'Billing & Payments',
      permissions: [
        { name: 'View Invoices', key: 'bil_view' },
        { name: 'Manage Subscriptions', key: 'bil_manage' },
        { name: 'Refund Transactions', key: 'bil_refund' },
      ],
    },
  ];
  selectedGroupedPermissions: string[] = ['usr_view', 'bil_view'];

  // Code Tab state for examples
  activeTabs: { [key: string]: 'demo' | 'html' | 'ts' } = {};
  copiedSection: string | null = null;

  // Sidebar navigation state
  isNavCollapsed = false;

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
  [focusOnOpenStrategy]="'always'" 
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

    templateHtml: `<!-- 1. Single Custom Selected Item / Label Template -->
<ngb-select [options]="members" [(ngModel)]="selectedMember" optionLabel="name" [fluid]="true">
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

<!-- 2. Multi-Select Custom Chip Template -->
<ngb-select [options]="countries" [(ngModel)]="selectedChips" [multiple]="true" display="chip" [fluid]="true">
  <ng-template #chip let-country>
    <span class="d-inline-flex align-items-center gap-1">
      <span>{{ country.flag }}</span>
      <strong class="text-primary">{{ country.name }}</strong>
    </span>
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

    floatLabelHtml: `<!-- 1. Float Label Variant: "on" (Outlined Border-Notched) -->
<ngb-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [floatLabel]="true" floatLabelVariant="on" placeholder="Outlined Border (on)" [fluid]="true"></ngb-select>

<!-- 2. Float Label Variant: "in" (Classic Bootstrap In-Box) -->
<ngb-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [floatLabel]="true" floatLabelVariant="in" placeholder="Inside Box (in)" [fluid]="true"></ngb-select>

<!-- 3. Float Label Variant: "over" (Over/Above Field) -->
<ngb-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [floatLabel]="true" floatLabelVariant="over" placeholder="Over Field (over)" [fluid]="true"></ngb-select>`,

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
signalCity = signal<string>('TOK');`,

    arabicHtml: `<!-- Arabic (AR) Localized Select with RTL layout & Diacritics Normalization -->
<div dir="rtl" lang="ar">
  <!-- 1. Single Select with Normalized Arabic Search -->
  <ngb-select
    [options]="arabicCountries"
    [(ngModel)]="selectedArabicCountry"
    optionLabel="name"
    optionValue="code"
    [filter]="true"
    filterPlaceholder="ابحث عن دولة (مثال: مصر، الامارات، الاردن)..."
    placeholder="-- اختر الدولة --"
    [showClear]="true"
    [fluid]="true">
  </ngb-select>

  <!-- 2. Multi-Select with Chips & Select All in Arabic -->
  <ngb-select
    [options]="arabicCities"
    [(ngModel)]="selectedArabicCities"
    optionLabel="name"
    optionValue="id"
    [multiple]="true"
    display="chip"
    [showSelectAll]="true"
    selectAllLabel="تحديد الكل"
    selectedItemsLabel="{0} مدن محددة"
    [filter]="true"
    filterPlaceholder="ابحث عن مدينة..."
    placeholder="اختر المدن المراد زيارتها"
    [fluid]="true">
  </ngb-select>
</div>`,

    triggerHtml: `<!-- In-Trigger Inline Filter & Custom Search Placeholder -->
<ngb-select
  [options]="cities"
  [(ngModel)]="selectedCity"
  optionLabel="name"
  [filter]="true"
  [filterInTrigger]="true"
  searchPlaceholder="Type directly in trigger to filter..."
  [showClear]="true"
  [fluid]="true">
</ngb-select>`,

    searchableMultiHtml: `<!-- Searchable Multi-Select with Chips & Select All -->
<ngb-select
  [options]="countries"
  [(ngModel)]="selectedCountries"
  optionLabel="name"
  [multiple]="true"
  display="chip"
  [filter]="true"
  filterBy="name,code,currency"
  searchPlaceholder="Search countries by name, code, currency..."
  [showSelectAll]="true"
  selectAllLabel="Select All Countries"
  [showClear]="true"
  [fluid]="true">
</ngb-select>`,

    cascadingHtml: `<!-- Cascading / Dependent Dropdowns -->
<div class="row g-3">
  <div class="col-md-6">
    <label class="form-label">Country:</label>
    <ngb-select
      [options]="cascadingCountries"
      [(ngModel)]="selectedCascadingCountry"
      (onChange)="onCascadingCountryChange($event.value)"
      optionLabel="name"
      optionValue="code"
      placeholder="Select Country"
      [showClear]="true"
      [fluid]="true">
    </ngb-select>
  </div>
  <div class="col-md-6">
    <label class="form-label">City:</label>
    <ngb-select
      [options]="cascadingAvailableCities"
      [(ngModel)]="selectedCascadingCity"
      [disabled]="!selectedCascadingCountry"
      optionLabel="name"
      optionValue="id"
      placeholder="Select City"
      [showClear]="true"
      [fluid]="true">
    </ngb-select>
  </div>
</div>`,

    asyncSearchHtml: `<!-- Server-Side Debounced Async Search -->
<ngb-select
  [options]="asyncSearchResults"
  [(ngModel)]="selectedAsyncUser"
  optionLabel="login"
  optionValue="id"
  [filter]="true"
  [loading]="isAsyncSearching"
  (onFilter)="onAsyncSearchFilter($event.filter)"
  searchPlaceholder="Type username (e.g. alex, john)..."
  emptyFilterMessage="No users matched search"
  [fluid]="true">
  <ng-template #item let-user>
    <div><strong>{{ user.login }}</strong> <span class="badge bg-secondary-subtle text-secondary ms-2">{{ user.role }}</span></div>
  </ng-template>
</ngb-select>`,

    customIconsHtml: `<!-- Custom Dropdown & Clear Icons -->
<ngb-select
  [options]="browsers"
  [(ngModel)]="selectedBrowser"
  optionLabel="name"
  optionValue="id"
  [showClear]="true"
  [fluid]="true">
  <ng-template #dropdownIcon>
    <i class="bi bi-compass-fill text-primary"></i>
  </ng-template>
  <ng-template #clearIcon>
    <i class="bi bi-trash text-danger"></i>
  </ng-template>
</ngb-select>`,

    tableEditHtml: `<!-- Table Cell In-Place Inline Editing -->
<table class="table table-hover align-middle">
  <thead>
    <tr>
      <th>Member</th>
      <th>Email</th>
      <th style="width: 180px;">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let member of tableMembers">
      <td class="fw-semibold">{{ member.name }}</td>
      <td>{{ member.email }}</td>
      <td>
        <ngb-select
          [options]="roleOptions"
          [(ngModel)]="member.role"
          size="small"
          optionLabel="label"
          optionValue="value"
          [fluid]="true">
        </ngb-select>
      </td>
    </tr>
  </tbody>
</table>`,

    modalHtml: `<!-- Bootstrap Modal with appendTo="body" -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#demoModal">
  Open Modal Dialog
</button>
<div class="modal fade" id="demoModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Assign Department</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <ngb-select
          [options]="departments"
          [(ngModel)]="selectedModalDept"
          optionLabel="name"
          optionValue="name"
          appendTo="body"
          [filter]="true"
          placeholder="Select Department"
          [fluid]="true">
        </ngb-select>
      </div>
    </div>
  </div>
</div>`,

    customChipHtml: `<!-- Multi-Select with Custom Chip Template -->
<ngb-select
  [options]="collaborators"
  [(ngModel)]="selectedCollaborators"
  optionLabel="name"
  optionValue="id"
  [multiple]="true"
  display="chip"
  placeholder="Add team collaborators"
  [fluid]="true">
  <ng-template #chip let-user>
    <div class="d-inline-flex align-items-center gap-1">
      <img [src]="user.avatar" class="rounded-circle" width="18" height="18" />
      <span class="fw-semibold">{{ user.name }}</span>
      <span class="badge bg-primary-subtle text-primary ms-1">{{ user.team }}</span>
    </div>
  </ng-template>
</ngb-select>`,

    darkThemeHtml: `<!-- Dark Mode Theme Integration -->
<div class="p-3 rounded bg-dark text-light border" data-bs-theme="dark">
  <ngb-select
    [options]="themeOptions"
    [(ngModel)]="activeDemoTheme"
    optionLabel="label"
    optionValue="id"
    [showClear]="true"
    [filter]="true"
    placeholder="Select Dark Option"
    [fluid]="true">
  </ngb-select>
</div>`,

    a11yHtml: `<!-- Accessibility & Screen Reader Label -->
<label id="paymentLabel" class="form-label fw-bold">Payment Method:</label>
<ngb-select
  [options]="paymentMethods"
  [(ngModel)]="selectedPayment"
  ariaLabelledBy="paymentLabel"
  optionLabel="name"
  optionValue="code"
  placeholder="Select Payment"
  [fluid]="true">
</ngb-select>`,

    formResetHtml: `<!-- Form Reset & Dynamic Disabling -->
<form [formGroup]="accountForm">
  <ngb-select
    [options]="plans"
    formControlName="plan"
    optionLabel="name"
    optionValue="id"
    [fluid]="true">
  </ngb-select>
  <div class="d-flex gap-2 mt-2">
    <button type="button" class="btn btn-sm btn-outline-secondary" (click)="toggleAccountPlanDisable()">
      Toggle Disabled
    </button>
    <button type="button" class="btn btn-sm btn-outline-danger" (click)="resetAccountPlanForm()">
      Reset Form
    </button>
  </div>
</form>`,

    groupedMultiHtml: `<!-- Hierarchical Grouped Multi-Select -->
<ngb-select
  [options]="groupedPermissions"
  [(ngModel)]="selectedGroupedPermissions"
  [group]="true"
  optionGroupLabel="category"
  optionGroupChildren="permissions"
  optionLabel="name"
  optionValue="key"
  [multiple]="true"
  [showSelectAll]="true"
  display="chip"
  placeholder="Assign categorized permissions"
  [fluid]="true">
</ngb-select>`,
  };
}
