# 03. Implementation Details and Logic

## 1. ControlValueAccessor Implementation
To act as a native Angular form control, the component must implement `ControlValueAccessor`. 

```typescript
import { Component, forwardRef, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngb-select',
  standalone: true,
  templateUrl: './ngb-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgbSelectComponent),
      multi: true
    }
  ]
})
export class NgbSelectComponent implements ControlValueAccessor {
  // Internal State
  public value: any = null; // Can be single value or array (any[]) when multiple: true
  public isDisabled: boolean = false;

  @Input() multiple: boolean = false;
  @Input() display: SelectDisplayMode = 'comma';
  @Input() showSelectAll: boolean = false;
  @Input() selectAll: boolean | null = null;
  @Input() maxSelectedLabels: number = 3;
  @Input() selectedItemsLabel: string = '{0} items selected';
  @Input() selectionLimit?: number;
  @Input() closeOnSelect: boolean = false;
  @Input() overlayVisible: boolean = false;

  @Output() overlayVisibleChange = new EventEmitter<boolean>();
  @Output() onSelectAllChange = new EventEmitter<{ originalEvent: Event, checked: boolean }>();
  @Output() onRemoveChip = new EventEmitter<{ originalEvent: Event, value: any }>();

  // CVA Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  // Triggered by ngModel or formControl
  writeValue(obj: any): void {
    if (this.multiple) {
      this.value = Array.isArray(obj) ? [...obj] : [];
    } else {
      this.value = obj !== undefined ? obj : null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // User Interaction for Option Selection
  selectOption(option: any, event: Event): void {
    if (this.isOptionDisabled(option)) return;
    
    const val = this.resolveOptionValue(option);

    if (this.multiple) {
      let currentSelection: any[] = Array.isArray(this.value) ? [...this.value] : [];
      const selectedIndex = this.findOptionIndex(option, currentSelection);

      if (selectedIndex !== -1) {
        currentSelection.splice(selectedIndex, 1);
      } else {
        if (this.selectionLimit !== undefined && currentSelection.length >= this.selectionLimit) {
          return; // Max selection limit reached
        }
        currentSelection.push(val);
      }

      this.value = currentSelection;
      this.onChange(this.value);
      this.updateSelectAllState();

      if (this.closeOnSelect) {
        this.overlayVisible = false;
        this.overlayVisibleChange.emit(this.overlayVisible);
      }
    } else {
      this.value = val;
      this.onChange(val);
      this.overlayVisible = false;
      this.overlayVisibleChange.emit(this.overlayVisible);
    }
  }

  // Remove a specific chip item in multi-select mode
  removeChip(val: any, event: Event): void {
    event.stopPropagation();
    if (this.isDisabled || this.readonly) return;

    if (Array.isArray(this.value)) {
      this.value = this.value.filter(item => !this.areValuesEqual(item, val));
      this.onChange(this.value);
      this.onRemoveChip.emit({ originalEvent: event, value: val });
      this.updateSelectAllState();
    }
  }

  // Toggle Select All checkbox in header
  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const targetOptions = this.filteredOptions.filter(opt => !this.isOptionDisabled(opt));

    if (checked) {
      const allValues = targetOptions.map(opt => this.resolveOptionValue(opt));
      this.value = [...allValues];
    } else {
      this.value = [];
    }

    this.selectAll = checked;
    this.onChange(this.value);
    this.onSelectAllChange.emit({ originalEvent: event, checked });
  }

  // Equality check handling dataKey for complex objects and multiple selection arrays
  isSelected(option: any): boolean {
    const val = this.resolveOptionValue(option);
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.some(item => this.areValuesEqual(item, val));
    }
    return this.areValuesEqual(this.value, val);
  }

  areValuesEqual(val1: any, val2: any): boolean {
    if (this.dataKey && val1 && val2) {
      return val1[this.dataKey] === val2[this.dataKey];
    }
    return val1 === val2;
  }
}
```

## 2. Dropdown State and Click Outside Handling
Bootstrap normally handles dropdowns via JS, but we must handle state strictly via Angular to avoid external library dependencies.

```typescript
  @Input() focusOnOpen?: number;

  toggleDropdown(): void {
    if (this.isDisabled || this.readonly) return;
    this.overlayVisible = !this.overlayVisible;
    this.overlayVisibleChange.emit(this.overlayVisible);
    
    if (this.overlayVisible) {
      this.onTouched(); // Mark form as touched when opened
      this.handleFocusOnOpen();
    }
  }

  handleFocusOnOpen(): void {
    if (this.focusOnOpen !== undefined && this.focusOnOpen >= 0) {
      // Use setTimeout to ensure DOM is rendered before querying and scrolling
      setTimeout(() => {
        const options = this.elementRef.nativeElement.querySelectorAll('.dropdown-item[role="option"]');
        if (options && options[this.focusOnOpen]) {
          options[this.focusOnOpen].focus();
          options[this.focusOnOpen].scrollIntoView({ block: 'nearest', inline: 'start' });
        }
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.overlayVisible) {
      this.overlayVisible = false;
      this.overlayVisibleChange.emit(this.overlayVisible);
    }
  }
```

## 3. Filtering Logic (Client-Side)
The filtering mechanism should use a case-insensitive includes check.

```typescript
  private get safeOptions(): any[] {
    return this.options || [];
  }

  public filteredOptions: any[] = [];
  public filterValue: string = '';

  @Input() filterNormalizeArabic: boolean = true;

  onFilterChange(event: Event): void {
    const rawValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.processFilterString(rawValue || '');
    
    if (!this.filterValue) {
      this.filteredOptions = [...this.safeOptions];
    } else {
      this.filteredOptions = this.safeOptions.filter(opt => {
        const label = this.resolveOptionLabel(opt) || '';
        const processedLabel = this.processFilterString(label.toString());
        return processedLabel.includes(this.filterValue);
      });
    }
  }

  private processFilterString(str: string): string {
    let result = str.toLowerCase();
    if (this.filterNormalizeArabic) {
      result = this.normalizeArabicText(result);
    }
    return result;
  }

  // Normalizes Arabic variants (Alef, Yaa, Taa Marbuta) & removes Tashkeel
  private normalizeArabicText(text: string): string {
    return text
      .replace(/[\u064B-\u065F\u0670]/g, '') // Remove Arabic Tashkeel diacritics
      .replace(/[إأآا]/g, 'ا') // Normalize Alef
      .replace(/[يى]/g, 'ي')  // Normalize Yaa
      .replace(/[ة]/g, 'ه');   // Normalize Taa Marbuta
  }
```

## 4. Advanced HTML Template (Bootstrap)
Demonstrating ARIA roles, float label integration, and template outlets.

```html
<div class="position-relative" 
     [class.form-floating]="floatLabel" 
     [class.w-100]="fluid"
     [ngStyle]="style" 
     [ngClass]="styleClass"
     (keydown)="onKeyDown($event)" tabindex="0">
     
  <!-- Select Trigger Box -->
  <div class="form-select d-flex align-items-center justify-content-between cursor-pointer"
       [class.is-invalid]="invalid" 
       [class.disabled]="isDisabled"
       [class.form-select-sm]="size === 'small'"
       [class.form-select-lg]="size === 'large'"
       [class.bg-light]="variant === 'filled'"
       [attr.id]="id"
       [attr.aria-label]="ariaLabel"
       [attr.aria-labelledby]="ariaLabelledBy"
       (click)="toggleDropdown()" 
       role="combobox" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
       
    <span class="text-truncate w-100 d-flex flex-wrap align-items-center gap-1">
      <!-- Editable Input or Standard Label / Chips -->
      <ng-container *ngIf="editable && !multiple; else displaySelectionTpl">
        <input type="text" class="form-control border-0 bg-transparent p-0 w-100" 
               [value]="resolveOptionLabel(value)" 
               (input)="onEditableInput($event)"
               (click)="$event.stopPropagation()">
      </ng-container>

      <ng-template #displaySelectionTpl>
        <!-- Multiple Chips Display Mode -->
        <ng-container *ngIf="multiple && display === 'chip' && hasSelection; else textLabelTpl">
          <ng-container *ngFor="let val of value">
            <span class="badge bg-light text-dark border d-inline-flex align-items-center py-1 px-2">
              <ng-container *ngTemplateOutlet="chipTemplate ? chipTemplate : defaultChipTpl; context: {$implicit: val}"></ng-container>
              <ng-template #defaultChipTpl>{{ resolveOptionLabel(val) }}</ng-template>
              <i class="bi bi-x ms-1 cursor-pointer" (click)="removeChip(val, $event)"></i>
            </span>
          </ng-container>
        </ng-container>

        <!-- Standard Single or Comma Multi-Select Label -->
        <ng-template #textLabelTpl>
          <ng-container *ngIf="hasSelection; else placeholderTpl">
            <ng-container *ngTemplateOutlet="selectedItemTemplate ? selectedItemTemplate : defaultSelectedTpl; context: {$implicit: value}"></ng-container>
          </ng-container>
          <ng-template #placeholderTpl><span class="text-muted">{{ placeholder }}</span></ng-template>
        </ng-template>
      </ng-template>
    </span>

    <div class="d-flex align-items-center">
      <i *ngIf="showClear && hasSelection" class="bi bi-x-circle me-2" (click)="clearValue($event)"></i>
      <div *ngIf="loading" class="spinner-border spinner-border-sm me-2"></div>
    </div>
  </div>
  
  <label *ngIf="floatLabel">{{ placeholder }}</label>

  <!-- Overlay Menu -->
  <div class="dropdown-menu w-100 shadow-sm" 
       [class.show]="overlayVisible" 
       [ngStyle]="panelStyle" 
       [ngClass]="panelStyleClass"
       role="listbox" 
       [style.max-height]="scrollHeight" 
       style="overflow-y: auto;">
    
    <!-- Header: Filter & Select All Checkbox -->
    <div class="px-2 pb-2 border-bottom mb-1" *ngIf="filter || (multiple && showSelectAll)">
      <div class="d-flex align-items-center mb-2" *ngIf="multiple && showSelectAll">
        <input type="checkbox" class="form-check-input me-2" 
               [checked]="selectAll" 
               (change)="toggleSelectAll($event)" id="selectAllCheckbox">
        <label class="form-check-label small fw-semibold cursor-pointer" for="selectAllCheckbox">Select All</label>
      </div>
      <input *ngIf="filter" type="text" class="form-control form-control-sm" 
             [placeholder]="filterPlaceholder" (input)="onFilterChange($event)">
    </div>

    <!-- Empty State -->
    <div *ngIf="filteredOptions.length === 0" class="dropdown-item text-muted text-center py-2">
      <ng-container *ngTemplateOutlet="emptyTemplate ? emptyTemplate : defaultEmptyTpl"></ng-container>
      <ng-template #defaultEmptyTpl>{{ filterValue ? emptyFilterMessage : emptyMessage }}</ng-template>
    </div>

    <!-- Items List -->
    <ng-container *ngFor="let option of filteredOptions">
      <button class="dropdown-item d-flex align-items-center" 
              role="option" 
              [attr.aria-selected]="isSelected(option)"
              [class.active]="!multiple && isSelected(option)"
              (click)="selectOption(option, $event)">
         <!-- Checkbox in Multiple Mode -->
         <input *ngIf="multiple" type="checkbox" 
                class="form-check-input me-2" 
                [checked]="isSelected(option)" 
                tabindex="-1" (click)="$event.stopPropagation()">
         <ng-container *ngTemplateOutlet="itemTemplate ? itemTemplate : defaultItemTpl; context: {$implicit: option}"></ng-container>
         <ng-template #defaultItemTpl>{{ resolveOptionLabel(option) }}</ng-template>
      </button>
    </ng-container>
  </div>
</div>
```

---

## 5. Arabic RTL Showcase Component Specification

For the demo application, an Arabic RTL showcase component demonstrates complete bidirectional functionality with localized Arabic mock datasets:

```typescript
@Component({
  selector: 'app-arabic-demo',
  standalone: true,
  imports: [NgbSelectComponent, FormsModule, ReactiveFormsModule, CommonModule],
  template: `
    <div class="card p-4 shadow-sm" dir="rtl" lang="ar">
      <h3 class="mb-4">تجربة المكون باللغة العربية (RTL Showcase)</h3>

      <!-- 1. Single Select Arabic -->
      <div class="mb-4">
        <label class="form-label fw-bold">اختر دولة عربية:</label>
        <ngb-select 
          [options]="arabicCountries" 
          [(ngModel)]="selectedCountry" 
          optionLabel="name" 
          optionValue="code"
          [filter]="true"
          filterPlaceholder="ابحث عن دولة..."
          placeholder="-- اختر الدولة --"
          emptyMessage="لا توجد نتائج"
          emptyFilterMessage="لم يتم العثور على نتائج مطابقة">
        </ngb-select>
      </div>

      <!-- 2. Multi-Select Arabic with Chips & Select All -->
      <div class="mb-4">
        <label class="form-label fw-bold">اختر المدن (تحديد متعدد مع وسوم):</label>
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
          placeholder="اختر المدن المراد زيارتها">
        </ngb-select>
      </div>

      <!-- 3. Grouped Options Arabic -->
      <div class="mb-4">
        <label class="form-label fw-bold">خيارات مجمعة حسب المنطقة:</label>
        <ngb-select 
          [options]="groupedRegions" 
          [(ngModel)]="selectedRegionCity" 
          [group]="true"
          optionGroupLabel="region" 
          optionGroupChildren="cities"
          optionLabel="name"
          placeholder="اختر المنطقة والمدينة">
        </ngb-select>
      </div>
    </div>
  `
})
export class ArabicDemoComponent {
  selectedCountry: string = 'SA';
  selectedCities: number[] = [1, 2];
  selectedRegionCity: any = null;

  arabicCountries = [
    { name: 'المملكة العربية السعودية', code: 'SA' },
    { name: 'الإمارات العربية المتحدة', code: 'AE' },
    { name: 'جمهورية مصر العربية', code: 'EG' },
    { name: 'المملكة الأردنية الهاشمية', code: 'JO' },
    { name: 'دولة الكويت', code: 'KW' },
    { name: 'دولة قطر', code: 'QA' },
    { name: 'سلطنة عمان', code: 'OM' }
  ];

  arabicCities = [
    { id: 1, name: 'الرياض' },
    { id: 2, name: 'دبي' },
    { id: 3, name: 'القاهرة' },
    { id: 4, name: 'عمان' },
    { id: 5, name: 'الدوحة' },
    { id: 6, name: 'مسقط' }
  ];

  groupedRegions = [
    {
      region: 'دول الخليج العربي',
      cities: [
        { name: 'الرياض', code: 'RUH' },
        { name: 'أبوظبي', code: 'AUH' },
        { name: 'الكويت', code: 'KWI' }
      ]
    },
    {
      region: 'بلاد الشام وشمال أفريقيا',
      cities: [
        { name: 'القاهرة', code: 'CAI' },
        { name: 'عمان', code: 'AMM' },
        { name: 'بيروت', code: 'BEY' }
      ]
    }
  ];
}
```
