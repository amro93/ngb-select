export const DEMO_SNIPPETS = {
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

  multiCommaTs: `maxSelectedLabels = 3;
cities = ...;
selectedCities = ...;`,

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

  multiChipsTs: `cities = ...;
selectedCities = ...;`,

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

  selectAllTs: `selectedCountries = ...;
countries = [
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
];`,

  focusOnOpenHtml: `<ngb-select 
  [options]="cities" 
  [(ngModel)]="selectedCity" 
  optionLabel="name" 
  [focusOnOpen]="3" 
  [focusOnOpenStrategy]="'always'" 
  placeholder="Open to auto-focus index 3 (Istanbul)"
  [fluid]="true">
</ngb-select>`,

  focusOnOpenTs: `selectedCity = ...;
cities = ...;
focusOnOpen = 3;`,

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

  reactiveTs: `userForm = new FormGroup({
  city: new FormControl<City | null>(null, [Validators.required]),
});
cities = ...;`,

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

  filterTs: `selectedCountry = ...;
countries = [
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
];`,

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

  templateTs: `selectedMember = this.members[0];
selectedChips = ...;
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
];`,

  groupHtml: `<ngb-select 
  [options]="groupedCars" 
  [(ngModel)]="selectedCar" 
  [group]="true"
  optionGroupLabel="label" 
  optionGroupChildren="items"
  placeholder="Select a Car"
  [fluid]="true">
</ngb-select>`,

  groupTs: `selectedCar = ...;
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
];`,

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

  editableTs: `customCity = ...;
cities = ...;`,

  floatLabelHtml: `<!-- 1. Float Label Variant: "on" (Outlined Border-Notched) -->
<ngb-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [floatLabel]="true" floatLabelVariant="on" placeholder="Outlined Border (on)" [fluid]="true"></ngb-select>

<!-- 2. Float Label Variant: "in" (Classic Bootstrap In-Box) -->
<ngb-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [floatLabel]="true" floatLabelVariant="in" placeholder="Inside Box (in)" [fluid]="true"></ngb-select>

<!-- 3. Float Label Variant: "over" (Over/Above Field) -->
<ngb-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [floatLabel]="true" floatLabelVariant="over" placeholder="Over Field (over)" [fluid]="true"></ngb-select>`,

  floatLabelTs: `selectedCity = ...;
cities = ...;`,

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

  signalsTs: `cities = ...;`,

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

  arabicTs: `arabicCountries = [
  { name: 'المملكة العربية السعودية', code: 'SA' },
  { name: 'الإمارات العربية المتحدة', code: 'AE' },
  { name: 'جمهورية مصر العربية', code: 'EG' },
  { name: 'المملكة الأردنية الهاشمية', code: 'JO' },
  { name: 'دولة الكويت', code: 'KW' },
  { name: 'دولة قطر', code: 'QA' },
  { name: 'سلطنة عمان', code: 'OM' },
];
selectedArabicCities = [1, 2];
selectedArabicCountry = 'SA';`,

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

  triggerTs: `selectedCity = ...;
cities = ...;`,

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

  searchableMultiTs: `selectedCountries = ...;
countries = [
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
];`,

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

  cascadingTs: `selectedCascadingCity = null;
cascadingCountries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Germany', code: 'DE' },
];
selectedCascadingCountry = null;
cascadingAvailableCities = [];`,

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

  asyncSearchTs: `asyncSearchResults = [];
selectedAsyncUser = null;
isAsyncSearching = false;`,

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

  customIconsTs: `browsers = [
  { id: 'chrome', name: 'Google Chrome', engine: 'Blink' },
  { id: 'firefox', name: 'Mozilla Firefox', engine: 'Gecko' },
  { id: 'safari', name: 'Apple Safari', engine: 'WebKit' },
  { id: 'edge', name: 'Microsoft Edge', engine: 'Blink' },
];
selectedBrowser = 'chrome';`,

  tableEditHtml: `<!-- Table Cell In-Place Inline Editing with Floating Dropdown -->
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
          appendTo="body"
          [fluid]="true">
        </ngb-select>
      </td>
    </tr>
  </tbody>
</table>`,

  tableEditTs: `roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];`,

  modalHtml: `<!-- Bootstrap Modal with appendTo="body" (data-bs-focus="false" allows body dropdown search) -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#demoModal">
  Open Modal Dialog
</button>
<div class="modal fade" id="demoModal" data-bs-focus="false">
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

  modalTs: `departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Product Design' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Sales & Growth' },
];
selectedModalDept = 'Engineering';`,

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
      <img [src]="user.avatar" [alt]="user.name" class="rounded-circle" width="18" height="18" />
      <span class="fw-semibold">{{ user.name }}</span>
      <span class="badge bg-primary-subtle text-primary ms-1">{{ user.team }}</span>
    </div>
  </ng-template>
</ngb-select>`,

  customChipTs: `collaborators = [
  {
    id: 1,
    name: 'Sarah Connor',
    team: 'Platform',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces',
  },
  {
    id: 2,
    name: 'John Doe',
    team: 'Mobile',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces',
  },
  {
    id: 3,
    name: 'Alex Rivera',
    team: 'Core UI',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces',
  },
];
selectedCollaborators = [1, 2];`,

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

  darkThemeTs: `activeDemoTheme = 'dark';
themeOptions = [
  { id: 'light', label: 'Light Theme' },
  { id: 'dark', label: 'Dark Theme' },
  { id: 'system', label: 'System Default' },
];`,

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

  a11yTs: `selectedPayment = 'cc';
paymentMethods = [
  { name: 'Credit / Debit Card', code: 'cc' },
  { name: 'PayPal', code: 'pp' },
  { name: 'Apple Pay / Google Pay', code: 'wallet' },
  { name: 'Bank Wire Transfer', code: 'bank' },
];`,

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

  formResetTs: `accountForm = new FormGroup({
  plan: new FormControl('pro', [Validators.required]),
});
plans = [
  { id: 'free', name: 'Free Starter' },
  { id: 'pro', name: 'Professional ($29/mo)' },
  { id: 'enterprise', name: 'Enterprise Cloud' },
];`,

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

  groupedMultiTs: `groupedPermissions = [
  {
    category: 'User Management',
    permissions: [
      { name: 'Create Users', key: 'usr_create' },
      { name: 'Delete Users', key: 'usr_delete' },
    ],
  }
];
selectedGroupedPermissions: string[] = ['usr_create'];`,

  mobileModalHtml: `<!-- Mobile Modal & Modal-in-Modal -->
<!-- Standalone trigger -->
<ngb-select
  [options]="countries"
  [(ngModel)]="modalSingleCountryCode"
  optionLabel="name"
  optionValue="code"
  [filter]="true"
  popupTitle="Choose Country (Mobile Dialog)"
  [modal]="true"
  [fluid]="true">
</ngb-select>

<!-- Modal-in-Modal Support (Using Standard Bootstrap .modal container) -->
<div class="modal fade" id="parentModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <label>Target Regions</label>
        <ngb-select
          [options]="countries"
          [(ngModel)]="modalMultiCountryCodes"
          optionLabel="name"
          optionValue="code"
          [multiple]="true"
          [showSelectAll]="true"
          display="chip"
          [filter]="true"
          popupTitle="Select Target Regions"
          [modal]="true"
          [fluid]="true">
        </ngb-select>
      </div>
    </div>
  </div>
</div>`,

  mobileModalTs: `countries: Country[] = [
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'France', code: 'FR' },
  { name: 'Italy', code: 'IT' },
];

modalSingleCountryCode: string | null = 'IT';
modalMultiCountryCodes: string[] = ['IT', 'FR'];`
};
