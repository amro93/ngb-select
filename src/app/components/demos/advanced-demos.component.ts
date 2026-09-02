import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbSelectComponent } from '../../../lib/ngb-select.component';
import { ExampleCardComponent } from '../example-card.component';
import { DEMO_SNIPPETS } from '../../data/demo-snippets';
import {
  ARABIC_COUNTRIES,
  ARABIC_CITIES,
  ARABIC_GROUPED_REGIONS,
  CASCADING_COUNTRIES,
  CASCADING_ALL_CITIES,
  BROWSERS,
  TABLE_MEMBERS,
  ROLE_OPTIONS,
  DEPARTMENTS,
  COLLABORATORS,
  THEME_OPTIONS,
  PAYMENT_METHODS,
  ACCOUNT_PLANS,
  GROUPED_PERMISSIONS,
  COUNTRIES,
} from '../../data/demo-data';

@Component({
  selector: 'app-advanced-demos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbSelectComponent,
    ExampleCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 17. Arabic (AR) RTL Showcase -->
    <div class="col-12" id="arabic-showcase">
      <app-example-card
        title="17. Arabic (AR) RTL Showcase & Diacritics Normalization"
        icon="bi bi-translate"
        iconClass="text-success"
        cardClass="border-success-subtle"
        headerClass="bg-success-subtle bg-opacity-10"
        titleClass="text-success-emphasis fw-bold"
        [htmlCode]="snippets.arabicHtml"
        [tsCode]="snippets.arabicTs"
      >
        <p class="text-muted small mb-3">
          Demonstrates full bidirectional layout (<code>dir="rtl"</code>), Arabic mock datasets, and
          intelligent Arabic text search normalization that ignores Tashkeel diacritics and equates
          letter variants.
        </p>
        <div class="p-3 border rounded bg-white" dir="rtl" lang="ar">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-bold text-dark small"
                >اختر دولة عربية (بحث مع تطبيع الحروف والتشكيل):</label
              >
              <ngb-select
                [options]="arabicCountries"
                [(ngModel)]="selectedArabicCountry"
                optionLabel="name"
                optionValue="code"
                [filter]="true"
                filterPlaceholder="ابحث عن دولة (مثال: مصر، الامارات، الاردن)..."
                placeholder="-- اختر الدولة --"
                emptyMessage="لا توجد نتائج"
                emptyFilterMessage="لم يتم العثور على نتائج مطابقة"
                [showClear]="true"
                [fluid]="true"
              >
              </ngb-select>
              <div class="mt-1 text-muted small">
                <strong>الدولة المختارة:</strong> <code>{{ selectedArabicCountry }}</code>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-dark small"
                >المدن المختارة (تحديد متعدد مع وسوم وخيار تحديد الكل):</label
              >
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
                [showClear]="true"
                [fluid]="true"
              >
              </ngb-select>
              <div class="mt-1 text-muted small">
                <strong>المدن المحددة ({{ selectedArabicCities.length }}):</strong>
                <code>{{ selectedArabicCities | json }}</code>
              </div>
            </div>
            <div class="col-12 mt-3">
              <label class="form-label fw-bold text-dark small"
                >خيارات مجمعة حسب المنطقة الجغرافية:</label
              >
              <ngb-select
                [options]="arabicGroupedRegions"
                [(ngModel)]="selectedArabicRegionCity"
                [group]="true"
                optionGroupLabel="region"
                optionGroupChildren="cities"
                optionLabel="name"
                [showClear]="true"
                placeholder="اختر المدينة حسب المنطقة..."
                [fluid]="true"
              >
              </ngb-select>
            </div>
          </div>
        </div>
      </app-example-card>
    </div>

    <!-- 18. Cascading / Dependent Dropdowns -->
    <div class="col-12" id="cascading">
      <app-example-card
        title="18. Cascading / Dependent Dropdowns"
        icon="bi bi-diagram-3-fill"
        iconClass="text-primary"
        [htmlCode]="snippets.cascadingHtml"
        [tsCode]="snippets.cascadingTs"
      >
        <p class="text-muted small mb-3">
          Dependent dropdown selection where selecting a parent Country automatically filters the
          available child Cities.
        </p>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">1. Select Country:</label>
            <ngb-select
              [options]="cascadingCountries"
              [(ngModel)]="selectedCascadingCountry"
              (onChange)="onCascadingCountryChange($event.value)"
              optionLabel="name"
              optionValue="code"
              placeholder="Select Country..."
              [showClear]="true"
              [fluid]="true"
            >
            </ngb-select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">2. Select Dependent City:</label>
            <ngb-select
              [options]="cascadingAvailableCities"
              [(ngModel)]="selectedCascadingCity"
              [disabled]="!selectedCascadingCountry"
              optionLabel="name"
              optionValue="id"
              placeholder="Select City..."
              [showClear]="true"
              [fluid]="true"
            >
            </ngb-select>
          </div>
        </div>
        <div class="p-2 bg-light rounded text-muted small mt-3">
          <strong>Selected:</strong> Country: <code>{{ selectedCascadingCountry || 'None' }}</code
          >, City ID:
          <code>{{ selectedCascadingCity || 'None' }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 19. Server-Side Debounced Async Search -->
    <div class="col-12" id="async-search">
      <app-example-card
        title="19. Server-Side Debounced Async Search"
        icon="bi bi-cloud-arrow-down-fill"
        iconClass="text-info"
        [htmlCode]="snippets.asyncSearchHtml"
        [tsCode]="snippets.asyncSearchTs"
      >
        <p class="text-muted small mb-3">
          Simulates debounced real-time server queries as the user types (e.g. searching users via
          remote API).
        </p>
        <div class="mb-3">
          <ngb-select
            [options]="asyncSearchResults"
            [(ngModel)]="selectedAsyncUser"
            optionLabel="login"
            optionValue="id"
            [filter]="true"
            [loading]="isAsyncSearching"
            (onFilter)="onAsyncSearchFilter($event.filter)"
            searchPlaceholder="Type at least 2 chars (e.g. dev, lead, alex)..."
            emptyFilterMessage="No remote users found matching criteria"
            placeholder="Search remote users..."
            [fluid]="true"
          >
            <ng-template #item let-user>
              <div class="d-flex align-items-center justify-content-between w-100">
                <strong>{{ user.login }}</strong>
                <span class="badge bg-primary-subtle text-primary">{{ user.role }}</span>
              </div>
            </ng-template>
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected User ID:</strong> <code>{{ selectedAsyncUser || 'None' }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 20. Custom Icon Templates -->
    <div class="col-12" id="custom-icons">
      <app-example-card
        title="20. Custom Dropdown & Clear Icon Templates"
        icon="bi bi-stars"
        iconClass="text-warning"
        [htmlCode]="snippets.customIconsHtml"
        [tsCode]="snippets.customIconsTs"
      >
        <p class="text-muted small mb-3">
          Customizes indicators using <code>#dropdownIcon</code> and
          <code>#clearIcon</code> templates.
        </p>
        <div class="mb-3">
          <ngb-select
            [options]="browsers"
            [(ngModel)]="selectedBrowser"
            optionLabel="name"
            optionValue="id"
            [showClear]="true"
            placeholder="Choose Browser..."
            [fluid]="true"
          >
            <ng-template #dropdownIcon>
              <i class="bi bi-compass text-primary fw-bold"></i>
            </ng-template>
            <ng-template #clearIcon>
              <i class="bi bi-trash-fill text-danger"></i>
            </ng-template>
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected Browser:</strong> <code>{{ selectedBrowser }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 21. Table Cell In-Place Inline Editing -->
    <div class="col-12" id="table-edit">
      <app-example-card
        title="21. Table Cell In-Place Inline Editing"
        icon="bi bi-table"
        iconClass="text-success"
        [htmlCode]="snippets.tableEditHtml"
        [tsCode]="snippets.tableEditTs"
      >
        <p class="text-muted small mb-3">
          Compact <code>size="small"</code> selects seamlessly embedded inside data table rows.
        </p>
        <div class="table-responsive" style="overflow: visible">
          <table class="table table-hover table-bordered align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th style="width: 220px">Role (Inline Edit)</th>
              </tr>
            </thead>
            <tbody>
              @for (member of tableMembers; track member.id) {
                <tr>
                  <td class="fw-semibold">{{ member.name }}</td>
                  <td class="text-muted small">{{ member.email }}</td>
                  <td>
                    <ngb-select
                      [options]="roleOptions"
                      [(ngModel)]="member.role"
                      size="small"
                      optionLabel="label"
                      optionValue="value"
                      [fluid]="true"
                    >
                    </ngb-select>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </app-example-card>
    </div>

    <!-- 22. Bootstrap Modal Dialog Integration -->
    <div class="col-12" id="modal-dialog">
      <app-example-card
        title="22. Bootstrap Modal Dialog Integration"
        icon="bi bi-window-stack"
        iconClass="text-secondary"
        [htmlCode]="snippets.modalHtml"
        [tsCode]="snippets.modalTs"
      >
        <p class="text-muted small mb-3">
          Using <code>appendTo="body"</code> ensures overlays display above modal dialogs without
          clipping.
        </p>
        <button
          type="button"
          class="btn btn-outline-primary shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i class="bi bi-box-arrow-up-right me-1"></i> Open Bootstrap Modal
        </button>

        <!-- Modal Dialog Container -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-focus="false"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow-lg border-0">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <i class="bi bi-person-plus-fill me-2"></i>Assign Member Department
                </h5>
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body p-4">
                <label class="form-label fw-semibold text-muted small">Select Department</label>
                <ngb-select
                  [options]="departments"
                  [(ngModel)]="selectedModalDept"
                  optionLabel="name"
                  optionValue="name"
                  appendTo="body"
                  [filter]="true"
                  placeholder="Choose department..."
                  [fluid]="true"
                >
                </ngb-select>
              </div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">
                  Save Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </app-example-card>
    </div>

    <!-- 23. Custom Chip Badges -->
    <div class="col-12" id="custom-chip-user">
      <app-example-card
        title="23. Custom Chip Template with Avatars"
        icon="bi bi-person-badge"
        iconClass="text-primary"
        [htmlCode]="snippets.customChipHtml"
        [tsCode]="snippets.customChipTs"
      >
        <p class="text-muted small mb-3">
          Custom rendering for selected chip badges via the <code>#chip</code> template ref.
        </p>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Add Team Members:</label>
          <ngb-select
            [options]="collaborators"
            [(ngModel)]="selectedCollaborators"
            optionLabel="name"
            optionValue="id"
            [multiple]="true"
            display="chip"
            placeholder="Assign collaborators..."
            [fluid]="true"
          >
            <ng-template #chip let-user>
              <div class="d-inline-flex align-items-center gap-1">
                <img
                  [src]="user.avatar"
                  [alt]="user.name"
                  class="rounded-circle"
                  width="18"
                  height="18"
                  (error)="onAvatarError($event)"
                />
                <span class="fw-semibold">{{ user.name }}</span>
                <span class="badge bg-primary-subtle text-primary ms-1">{{ user.team }}</span>
              </div>
            </ng-template>
          </ngb-select>
        </div>
      </app-example-card>
    </div>

    <!-- 24. Dark Mode Theme -->
    <div class="col-12" id="dark-mode">
      <app-example-card
        title="24. Dark Mode Theme Support"
        icon="bi bi-moon-stars-fill"
        iconClass="text-dark"
        [htmlCode]="snippets.darkThemeHtml"
        [tsCode]="snippets.darkThemeTs"
      >
        <p class="text-muted small mb-3">
          Inherits Bootstrap 5 dark theme CSS variables automatically when
          <code>data-bs-theme="dark"</code> is applied to ancestor elements.
        </p>
        <div class="p-4 rounded-3 bg-dark text-light shadow-sm" data-bs-theme="dark">
          <label class="form-label small fw-semibold text-light">Dark Mode Select</label>
          <ngb-select
            [options]="themeOptions"
            [(ngModel)]="activeDemoTheme"
            optionLabel="label"
            optionValue="id"
            [showClear]="true"
            [filter]="true"
            placeholder="Select Dark Option..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
      </app-example-card>
    </div>

    <!-- 25. Accessibility (A11y) -->
    <div class="col-12" id="a11y">
      <app-example-card
        title="25. Accessibility (A11y) & ARIA Labels"
        icon="bi bi-universal-access"
        iconClass="text-info"
        [htmlCode]="snippets.a11yHtml"
        [tsCode]="snippets.a11yTs"
      >
        <p class="text-muted small mb-3">
          Full ARIA attribute support including <code>ariaLabel</code>, <code>ariaLabelledBy</code>,
          and screen reader roles.
        </p>
        <div class="mb-3">
          <label id="paymentMethodLabel" class="form-label text-muted small fw-semibold"
            >Select Payment Method</label
          >
          <ngb-select
            [options]="paymentMethods"
            [(ngModel)]="selectedPayment"
            ariaLabelledBy="paymentMethodLabel"
            optionLabel="name"
            optionValue="code"
            placeholder="Payment Options..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
      </app-example-card>
    </div>

    <!-- 26. Form Reset & Dynamic Disabling -->
    <div class="col-12" id="form-reset">
      <app-example-card
        title="26. Form Reset & Dynamic Disabling"
        icon="bi bi-arrow-counterclockwise"
        iconClass="text-danger"
        [htmlCode]="snippets.formResetHtml"
        [tsCode]="snippets.formResetTs"
      >
        <p class="text-muted small mb-3">
          Demonstrates programmatic form resetting, setting disabled states dynamically, and clean
          reactive sync.
        </p>
        <form [formGroup]="accountForm">
          <div class="mb-3">
            <label class="form-label small fw-semibold">Subscription Plan:</label>
            <ngb-select
              [options]="plans"
              formControlName="plan"
              optionLabel="name"
              optionValue="id"
              [fluid]="true"
            >
            </ngb-select>
          </div>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              (click)="toggleAccountPlanDisable()"
            >
              {{ accountForm.get('plan')?.disabled ? 'Enable Select' : 'Disable Select' }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              (click)="resetAccountPlanForm()"
            >
              Reset to Default
            </button>
          </div>
        </form>
      </app-example-card>
    </div>

    <!-- 27. Hierarchical Grouped Multi-Select -->
    <div class="col-12" id="grouped-multi">
      <app-example-card
        title="27. Hierarchical Grouped Multi-Select"
        icon="bi bi-layers-fill"
        iconClass="text-primary"
        [htmlCode]="snippets.groupedMultiHtml"
        [tsCode]="snippets.groupedMultiTs"
      >
        <p class="text-muted small mb-3">
          Multi-selection within categorized nested groups with sticky "Select All" and chip
          rendering.
        </p>
        <div class="mb-3">
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
            placeholder="Assign categorized permissions..."
            [fluid]="true"
          >
          </ngb-select>
        </div>
        <div class="p-2 bg-light rounded text-muted small">
          <strong>Selected Permissions:</strong>
          <code>{{ selectedGroupedPermissions | json }}</code>
        </div>
      </app-example-card>
    </div>

    <!-- 28. Mobile Modal & Modal-in-Modal -->
    <div class="col-12" id="mobile-modal">
      <app-example-card
        title="28. Mobile Modal & Modal-in-Modal"
        icon="bi bi-phone"
        iconClass="text-success"
        [htmlCode]="snippets.mobileModalHtml"
        [tsCode]="snippets.mobileModalTs"
      >
        <p class="text-muted small mb-3">
          Use <code>[modal]="true"</code> to render options in a centered popup dialog. Native
          Bootstrap <code>.modal</code> is generated internally, allowing
          <strong>Modal-in-Modal</strong> support without z-index conflicts.
        </p>
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label class="form-label text-muted small fw-semibold">Standalone Modal Dialog</label>
            <ngb-select
              [options]="countries"
              [(ngModel)]="modalSingleCountryCode"
              optionLabel="name"
              optionValue="code"
              [filter]="true"
              placeholder="Select a country..."
              popupTitle="Choose Country (Mobile Dialog)"
              [modal]="true"
              [showClear]="true"
              [fluid]="true"
            ></ngb-select>
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label text-muted small fw-semibold"
              >Trigger Parent Bootstrap Modal</label
            >
            <div>
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#parentModalDemo"
              >
                Open Parent Modal
              </button>
            </div>
          </div>
        </div>

        <!-- Parent Bootstrap Modal -->
        <div
          class="modal fade"
          id="parentModalDemo"
          tabindex="-1"
          aria-labelledby="parentModalDemoLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="parentModalDemoLabel">Create New Event</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label text-muted small fw-semibold">Event Name</label>
                  <input type="text" class="form-control" placeholder="e.g. Project Sync" />
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted small fw-semibold"
                    >Target Audience (Modal in Modal)</label
                  >
                  <ngb-select
                    [options]="countries"
                    [(ngModel)]="modalMultiCountryCodes"
                    optionLabel="name"
                    optionValue="code"
                    [multiple]="true"
                    [showSelectAll]="true"
                    display="chip"
                    [filter]="true"
                    placeholder="Add regions..."
                    popupTitle="Select Target Regions"
                    [modal]="true"
                    [fluid]="true"
                  ></ngb-select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </app-example-card>
    </div>
  `,
})
export class AdvancedDemosComponent {
  snippets = DEMO_SNIPPETS;

  countries = COUNTRIES;
  arabicCountries = ARABIC_COUNTRIES;
  arabicCities = ARABIC_CITIES;
  arabicGroupedRegions = ARABIC_GROUPED_REGIONS;
  cascadingCountries = CASCADING_COUNTRIES;
  cascadingAllCities = CASCADING_ALL_CITIES;
  browsers = BROWSERS;
  tableMembers = TABLE_MEMBERS;
  roleOptions = ROLE_OPTIONS;
  departments = DEPARTMENTS;
  collaborators = COLLABORATORS;
  themeOptions = THEME_OPTIONS;
  paymentMethods = PAYMENT_METHODS;
  plans = ACCOUNT_PLANS;
  groupedPermissions = GROUPED_PERMISSIONS;

  selectedArabicCountry: string = 'SA';
  selectedArabicCities: number[] = [1, 2];
  selectedArabicRegionCity: any = null;

  selectedCascadingCountry: string | null = null;
  selectedCascadingCity: number | null = null;
  cascadingAvailableCities: any[] = [];

  asyncSearchResults: any[] = [];
  selectedAsyncUser: number | null = null;
  isAsyncSearching = false;
  private asyncSearchTimeout: any = null;

  selectedBrowser: string | null = 'chrome';
  selectedModalDept: string | null = 'Engineering';
  selectedCollaborators: number[] = [1, 2];
  activeDemoTheme: string = 'dark';
  selectedPayment: string | null = 'cc';

  accountForm = new FormGroup({
    plan: new FormControl('pro', [Validators.required]),
  });

  selectedGroupedPermissions: string[] = ['usr_view', 'bil_view'];
  modalSingleCountryCode: string | null = 'IT';
  modalMultiCountryCodes: string[] = ['IT', 'FR'];

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

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="%230d6efd"/><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-size="24" font-weight="bold">U</text></svg>';
    }
  }
}
