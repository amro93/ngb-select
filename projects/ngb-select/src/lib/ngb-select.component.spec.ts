import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbSelectComponent } from './ngb-select.component';

// --- Test Host Component ---
@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ngb-select
        [options]="options"
        formControlName="selectedCity"
        [placeholder]="placeholder"
        [filter]="filter"
        [filterInTrigger]="filterInTrigger"
        [searchPlaceholder]="searchPlaceholder"
        [filterBy]="filterBy"
        [filterMatchMode]="filterMatchMode"
        [group]="group"
        [optionGroupLabel]="optionGroupLabel"
        [optionGroupChildren]="optionGroupChildren"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [optionDisabled]="optionDisabled"
        [showClear]="showClear"
        [disabled]="disabled"
        [loading]="loading"
        [floatLabel]="floatLabel"
        [floatLabelVariant]="floatLabelVariant"
        [invalid]="invalid"
        [editable]="editable"
        [dataKey]="dataKey"
        [size]="size"
        [multiple]="multiple"
        [display]="display"
        [showSelectAll]="showSelectAll"
        [maxSelectedLabels]="maxSelectedLabels"
        [selectionLimit]="selectionLimit"
        [closeOnSelect]="closeOnSelect"
        [focusOnOpen]="focusOnOpen"
        [focusOnOpenStrategy]="focusOnOpenStrategy"
        [dropdownPosition]="dropdownPosition"
        [dropdownDirection]="dropdownDirection"
        [direction]="direction"
        [modal]="modal"
        [popup]="popup"
        [touchUI]="touchUI"
        [popupTitle]="popupTitle"
        [modalTitle]="modalTitle"
        [dir]="dir"
        [appendTo]="appendTo"
        [(overlayVisible)]="overlayVisible"
        [filterNormalizeArabic]="filterNormalizeArabic"
        [filterPlaceholder]="filterPlaceholder"
        [emptyMessage]="emptyMessage"
        [emptyFilterMessage]="emptyFilterMessage"
        [filterLocale]="filterLocale"
        [readonly]="readonly"
        [autofocus]="autofocus"
        [tabindex]="tabindex"
        [id]="id"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
        [style]="style"
        [styleClass]="styleClass"
        [panelStyle]="panelStyle"
        [panelStyleClass]="panelStyleClass"
        [maxLength]="maxLength"
        [selectOnFocus]="selectOnFocus"
        [autoOptionFocus]="autoOptionFocus"
        [lazy]="lazy"
        (onChange)="onSelectChange($event)"
        (onFilter)="onFilterChange($event)"
        (onClear)="onClearChange($event)"
      >
      </ngb-select>
    </form>
  `,
})
class TestHostComponent {
  dropdownPosition: any = 'auto';
  dropdownDirection?: any;
  direction?: any;
  modal: boolean = false;
  popup: boolean = false;
  touchUI: boolean = false;
  popupTitle?: string;
  modalTitle?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
  appendTo?: 'body' | HTMLElement | string;
  options: any[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN', disabled: true },
    { name: 'Paris', code: 'PRS' },
  ];

  placeholder = 'Select a city';
  filter = false;
  filterInTrigger = false;
  searchPlaceholder?: string;
  filterBy?: string;
  filterMatchMode: any = 'contains';
  group = false;
  optionGroupLabel = 'label';
  optionGroupChildren = 'items';
  optionLabel = 'name';
  optionValue = 'code';
  optionDisabled = 'disabled';
  showClear = false;
  disabled = false;
  loading = false;
  floatLabel = false;
  floatLabelVariant: any = 'on';
  invalid = false;
  editable = false;
  dataKey?: string;
  size?: any;
  multiple = false;
  display: any = 'comma';
  showSelectAll = false;
  maxSelectedLabels = 3;
  selectionLimit?: number;
  closeOnSelect = false;
  focusOnOpen?: number;
  focusOnOpenStrategy: any = 'always';
  overlayVisible = false;
  filterNormalizeArabic: any;
  filterPlaceholder: any;
  emptyMessage: any;
  emptyFilterMessage: any;
  filterLocale: any;
  readonly: any;
  autofocus: any;
  tabindex: any;
  id: any;
  ariaLabel: any;
  ariaLabelledBy: any;
  style: any;
  styleClass: any;
  panelStyle: any;
  panelStyleClass: any;
  maxLength: any;
  selectOnFocus: any;
  autoOptionFocus: any;
  lazy: any;

  form = new FormGroup({
    selectedCity: new FormControl<any>(null),
  });

  lastChangeEvent: any = null;
  lastFilterEvent: any = null;
  lastClearEvent: any = null;

  onSelectChange(e: any): void {
    this.lastChangeEvent = e;
  }

  onFilterChange(e: any): void {
    this.lastFilterEvent = e;
  }

  onClearChange(e: any): void {
    this.lastClearEvent = e;
  }
}

describe('NgbSelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let selectComponent: NgbSelectComponent;

  const createComponent = (configureHost?: (host: TestHostComponent) => void) => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    if (configureHost) {
      configureHost(hostComponent);
    }
    fixture.detectChanges();
    selectComponent = fixture.debugElement.query(
      By.directive(NgbSelectComponent),
    ).componentInstance;
    return { fixture, hostComponent, selectComponent };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgbSelectComponent],
    }).compileComponents();
  });

  // ==========================================
  // Category 1: Rendering & Initialization
  // ==========================================
  describe('Category 1: Rendering & Initialization', () => {
    it('should create the component successfully', () => {
      const { selectComponent } = createComponent();
      expect(selectComponent).toBeTruthy();
    });

    it('should display placeholder when no value is selected', () => {
      const { fixture } = createComponent();
      const placeholderEl = fixture.debugElement.query(By.css('.form-select .text-muted'));
      expect(placeholderEl.nativeElement.textContent.trim()).toBe('Select a city');
    });

    it('should render all options in dropdown list when opened', () => {
      const { fixture, selectComponent } = createComponent();
      selectComponent.openOverlay();
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      expect(items.length).toBe(4);
    });

    it('should apply floating label class and variant classes when floatLabel is true', () => {
      const { fixture: fixOn } = createComponent((host) => {
        host.floatLabel = true;
        host.floatLabelVariant = 'on';
      });
      const containerOn = fixOn.debugElement.query(By.css('.ngb-select-container'));
      expect(containerOn.nativeElement.classList.contains('form-floating')).toBe(true);
      expect(containerOn.nativeElement.classList.contains('float-variant-on')).toBe(true);

      const { fixture: fixIn } = createComponent((host) => {
        host.floatLabel = true;
        host.floatLabelVariant = 'in';
      });
      const containerIn = fixIn.debugElement.query(By.css('.ngb-select-container'));
      expect(containerIn.nativeElement.classList.contains('float-variant-in')).toBe(true);

      const { fixture: fixOver } = createComponent((host) => {
        host.floatLabel = true;
        host.floatLabelVariant = 'over';
      });
      const containerOver = fixOver.debugElement.query(By.css('.ngb-select-container'));
      expect(containerOver.nativeElement.classList.contains('float-variant-over')).toBe(true);
    });
  });

  // ==========================================
  // Category 2: Interactions & Forms (CVA)
  // ==========================================
  describe('Category 2: Interactions & Forms', () => {
    it('should update form control and emit onChange when an option is selected', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent();
      selectComponent.openOverlay();
      fixture.detectChanges();
      await fixture.whenStable();

      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      items[0].nativeElement.click(); // Click 'New York' (code: 'NY')
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.form.get('selectedCity')?.value).toBe('NY');
      expect(hostComponent.lastChangeEvent?.value).toBe('NY');
      expect(selectComponent.overlayVisible()).toBe(false);
    });

    it('should update displayed label when writeValue is called via formControl', () => {
      const { fixture, hostComponent, selectComponent } = createComponent();
      hostComponent.form.get('selectedCity')?.setValue('RM');
      fixture.detectChanges();

      expect(selectComponent.getDisplayLabel()).toBe('Rome');
    });

    it('should mark option as active when selected', () => {
      const { fixture, hostComponent, selectComponent } = createComponent();
      hostComponent.form.get('selectedCity')?.setValue('PRS');
      selectComponent.openOverlay();
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      expect(items[3].nativeElement.classList.contains('active')).toBe(true);
    });
  });

  // ==========================================
  // Category 3: Filtering and Search
  // ==========================================
  describe('Category 3: Filtering & Search', () => {
    it('should render search input when filter is true', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.filter = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      expect(input).toBeTruthy();
    });

    it('should filter options list based on filter input', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.filter = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      input.nativeElement.value = 'Rom';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(1);
      expect(selectComponent.filteredOptions()[0].name).toBe('Rome');
    });

    it('should display empty message when filter produces no matches', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.filter = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      input.nativeElement.value = 'Nonexistent City';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.isOptionsEmpty()).toBe(true);
      const emptyMsg = fixture.debugElement.query(By.css('.dropdown-item.text-muted'));
      expect(emptyMsg.nativeElement.textContent).toContain('No results found');
    });

    it('should respect filterMatchMode="startsWith"', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.filter = true;
        host.filterMatchMode = 'startsWith';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      input.nativeElement.value = 'on'; // 'London' contains 'on', but doesn't start with 'on'
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(0);
    });

    it('should respect custom searchPlaceholder as placeholder in filter input', () => {
      const { fixture, selectComponent } = createComponent();
      hostComponent.filter = true;
      hostComponent.searchPlaceholder = 'Type to search cities...';
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      expect(input.nativeElement.placeholder).toBe('Type to search cities...');
    });

    it('should render and filter directly in the trigger when filterInTrigger is true', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.filter = true;
        host.filterInTrigger = true;
        host.searchPlaceholder = 'Search in trigger...';
      });

      const triggerInput = fixture.debugElement.query(By.css('.form-select input[type="text"]'));
      expect(triggerInput).toBeTruthy();
      expect(triggerInput.nativeElement.placeholder).toBe('Search in trigger...');

      triggerInput.nativeElement.value = 'Paris';
      triggerInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(1);
      expect(selectComponent.filteredOptions()[0].name).toBe('Paris');
    });
  });

  // ==========================================
  // Category 4: Grouping
  // ==========================================
  describe('Category 4: Grouping', () => {
    it('should render group headers correctly', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.group = true;
        host.optionGroupLabel = 'country';
        host.optionGroupChildren = 'cities';
        host.options = [
          {
            country: 'USA',
            cities: [
              { name: 'Chicago', code: 'CHI' },
              { name: 'Los Angeles', code: 'LA' },
            ],
          },
          {
            country: 'Italy',
            cities: [{ name: 'Rome', code: 'RM' }],
          },
        ];
      });

      selectComponent.openOverlay();
      fixture.detectChanges();

      const headers = fixture.debugElement.queryAll(By.css('.dropdown-header'));
      expect(headers.length).toBe(2);
      expect(headers[0].nativeElement.textContent.trim()).toBe('USA');
      expect(headers[1].nativeElement.textContent.trim()).toBe('Italy');
    });

    it('should allow selecting items inside groups', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent((host) => {
        host.group = true;
        host.optionGroupLabel = 'country';
        host.optionGroupChildren = 'cities';
        host.options = [
          {
            country: 'USA',
            cities: [
              { name: 'Chicago', code: 'CHI' },
              { name: 'Los Angeles', code: 'LA' },
            ],
          },
        ];
      });

      selectComponent.openOverlay();
      fixture.detectChanges();
      await fixture.whenStable();

      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      items[0].nativeElement.click(); // 'Chicago'
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.form.get('selectedCity')?.value).toBe('CHI');
    });
  });

  // ==========================================
  // Category 5: Clear, Disabled & Loading States
  // ==========================================
  describe('Category 5: States & Actions', () => {
    it('should show clear icon when showClear is true and value is selected', () => {
      const { fixture, hostComponent } = createComponent((host) => {
        host.showClear = true;
      });
      hostComponent.form.get('selectedCity')?.setValue('NY');
      fixture.detectChanges();

      const clearIcon = fixture.debugElement.query(By.css('.ngb-select-clear-icon'));
      expect(clearIcon).toBeTruthy();
    });

    it('should reset value when clear icon is clicked', () => {
      const { fixture, hostComponent } = createComponent((host) => {
        host.showClear = true;
      });
      hostComponent.form.get('selectedCity')?.setValue('NY');
      fixture.detectChanges();

      const clearIcon = fixture.debugElement.query(By.css('.ngb-select-clear-icon'));
      clearIcon.nativeElement.click();
      fixture.detectChanges();

      expect(hostComponent.form.get('selectedCity')?.value).toBeNull();
      expect(hostComponent.lastClearEvent).toBeTruthy();
    });

    it('should not open dropdown when disabled is true', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.form.get('selectedCity')?.disable();
      });

      const trigger = fixture.debugElement.query(By.css('.form-select'));
      trigger.nativeElement.click();
      fixture.detectChanges();

      expect(selectComponent.overlayVisible()).toBe(false);
    });

    it('should not allow selecting disabled option', () => {
      const { fixture, hostComponent, selectComponent } = createComponent();
      selectComponent.openOverlay();
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      items[2].nativeElement.click(); // London is disabled
      fixture.detectChanges();

      expect(hostComponent.form.get('selectedCity')?.value).toBeNull();
    });

    it('should display loading spinner when loading is true', () => {
      const { fixture } = createComponent((host) => {
        host.loading = true;
      });

      const spinner = fixture.debugElement.query(By.css('.spinner-border'));
      expect(spinner).toBeTruthy();
    });
  });

  // ==========================================
  // Category 6: Robustness & Edge Cases
  // ==========================================
  describe('Category 6: Robustness & Edge Cases', () => {
    it('should handle null or undefined options gracefully without error', () => {
      const { selectComponent } = createComponent((host) => {
        host.options = null as any;
      });

      expect(() => {
        selectComponent.openOverlay();
        selectComponent.updateFilteredOptions();
      }).not.toThrow();
    });

    it('should handle empty string as valid selection value', () => {
      const { hostComponent, selectComponent } = createComponent((host) => {
        host.options = [{ name: 'None', code: '' }];
      });
      hostComponent.form.get('selectedCity')?.setValue('');
      fixture.detectChanges();

      expect(selectComponent.value()).toBe('');
    });

    it('should work seamlessly with Angular Signal values in parent components', () => {
      const { selectComponent } = createComponent();
      const citySignal = signal<string>('RM');
      selectComponent.writeValue(citySignal());
      fixture.detectChanges();

      expect(selectComponent.getDisplayLabel()).toBe('Rome');
    });
  });

  // ==========================================
  // Category 7: Advanced Features (PrimeNG Parity)
  // ==========================================
  describe('Category 7: Advanced Features', () => {
    it('should match objects by dataKey rather than reference equality', () => {
      const { fixture, selectComponent } = createComponent();
      hostComponent.optionValue = undefined as any;
      hostComponent.dataKey = 'code';
      hostComponent.options = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
      ];
      selectComponent.writeValue({ name: 'Rome (Different ref)', code: 'RM' });
      fixture.detectChanges();

      expect(selectComponent.isSelected(selectComponent.options()[1])).toBe(true);
    });

    it('should support editable combobox input typing', () => {
      const { fixture, hostComponent } = createComponent((host) => {
        host.editable = true;
      });

      const input = fixture.debugElement.query(By.css('.form-select input[type="text"]'));
      expect(input).toBeTruthy();

      input.nativeElement.value = 'Custom City';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(hostComponent.form.get('selectedCity')?.value).toBe('Custom City');
    });

    it('should focus option on focusOnOpen index when opening popup', async () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.focusOnOpen = 1;
      });

      selectComponent.openOverlay();
      fixture.detectChanges();
      await new Promise((r) => setTimeout(r, 20));

      expect(selectComponent.focusedIndex()).toBe(1);
    });

    it('should prioritize selected item over focusOnOpen when focusOnOpenStrategy is notSelected and value is present', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent((host) => {
        host.focusOnOpen = 0; // NY is index 0
        host.focusOnOpenStrategy = 'notSelected';
      });
      hostComponent.form.get('selectedCity')?.setValue('PRS'); // PRS is index 3
      fixture.detectChanges();

      selectComponent.openOverlay();
      fixture.detectChanges();
      await new Promise((r) => setTimeout(r, 20));

      expect(selectComponent.focusedIndex()).toBe(3); // Should focus selected PRS instead of focusOnOpen index 0
    });

    it('should use focusOnOpen when focusOnOpenStrategy is notSelected and no value is selected', async () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.focusOnOpen = 1; // Rome is index 1
        host.focusOnOpenStrategy = 'notSelected';
      });

      selectComponent.openOverlay();
      fixture.detectChanges();
      await new Promise((r) => setTimeout(r, 20));

      expect(selectComponent.focusedIndex()).toBe(1);
    });

    it('should support two-way binding on overlayVisible', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent();
      selectComponent.openOverlay();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(selectComponent.overlayVisible()).toBe(true);
      expect(hostComponent.overlayVisible).toBe(true);
    });
  });

  // ==========================================
  // Category 8: Multi-Select Scenarios
  // ==========================================
  describe('Category 8: Multi-Select Scenarios', () => {
    it('should initialize multi-select with array of values', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.multiple = true;
      });
      hostComponent.options = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'Paris', code: 'PRS' },
      ];
      selectComponent.writeValue(['NY', 'PRS']);
      fixture.detectChanges();

      expect(selectComponent.isSelected(selectComponent.options()[0])).toBe(true);
      expect(selectComponent.isSelected(selectComponent.options()[1])).toBe(false);
      expect(selectComponent.isSelected(selectComponent.options()[2])).toBe(true);
    });

    it('should toggle selection in multiple mode and remain open by default', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent((host) => {
        host.multiple = true;
      });
      hostComponent.form.get('selectedCity')?.setValue(['NY']);
      selectComponent.openOverlay();
      fixture.detectChanges();
      await fixture.whenStable();

      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      items[1].nativeElement.click(); // Select 'Rome' ('RM')
      fixture.detectChanges();
      await fixture.whenStable();

      expect(hostComponent.form.get('selectedCity')?.value).toEqual(['NY', 'RM']);
      expect(selectComponent.overlayVisible()).toBe(true); // Should remain open
    });

    it('should render chips when display="chip"', () => {
      const { fixture, hostComponent } = createComponent((host) => {
        host.multiple = true;
        host.display = 'chip';
      });
      hostComponent.form.get('selectedCity')?.setValue(['NY', 'RM']);
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('.badge.bg-light'));
      expect(chips.length).toBe(2);
    });

    it('should select all and deselect all options via Select All checkbox', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.multiple = true;
        host.showSelectAll = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const selectAllInput = fixture.debugElement.query(By.css('#selectAllCheckbox')).nativeElement;
      selectAllInput.checked = true;
      selectAllInput.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(selectComponent.value().length).toBe(3); // 3 non-disabled items (NY, RM, PRS)
      expect(selectComponent.selectAll()).toBe(true);
    });

    it('should enforce selectionLimit in multi-select mode', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.multiple = true;
        host.selectionLimit = 2;
      });
      selectComponent.writeValue(['NY', 'RM']);
      fixture.detectChanges();

      const thirdOption = { name: 'Paris', code: 'PRS' };
      selectComponent.onOptionClick(thirdOption, new Event('click'));
      fixture.detectChanges();

      expect(selectComponent.value().length).toBe(2);
      expect(selectComponent.value()).toEqual(['NY', 'RM']);
    });

    it('should strictly sync checkbox checked state with selected options in multiple mode', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent((host) => {
        host.multiple = true;
      });
      hostComponent.form.get('selectedCity')?.setValue(['RM']);
      selectComponent.openOverlay();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkboxes = fixture.debugElement.queryAll(
        By.css('.dropdown-item input[type="checkbox"]'),
      );
      expect(checkboxes.length).toBe(4);
      expect(checkboxes[0].nativeElement.checked).toBe(false); // NY
      expect(checkboxes[1].nativeElement.checked).toBe(true); // RM
      expect(checkboxes[2].nativeElement.checked).toBe(false); // LDN
      expect(checkboxes[3].nativeElement.checked).toBe(false); // PRS

      // Click on New York row
      const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
      items[0].nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(checkboxes[0].nativeElement.checked).toBe(true);
      expect(checkboxes[1].nativeElement.checked).toBe(true);
    });
  });

  // ==========================================
  // Category 9: RTL & Arabic Localization Scenarios
  // ==========================================
  describe('Category 9: RTL & Arabic Localization', () => {
    it('should match Arabic search terms regardless of Alef variants or Tashkeel diacritics', () => {
      const { fixture, selectComponent } = createComponent();
      hostComponent.options = [
        { id: 1, name: 'الإمارات' },
        { id: 2, name: 'الْأُرْدُنّ' }, // with Tashkeel diacritics
        { id: 3, name: 'مصر' },
      ];
      hostComponent.filter = true;
      hostComponent.filterNormalizeArabic = true;
      hostComponent.optionLabel = 'name';
      hostComponent.optionValue = 'id';
      selectComponent.openOverlay();
      fixture.detectChanges();

      // Query with bare Alef 'امارات'
      const input = fixture.debugElement.query(By.css('input.form-control')).nativeElement;
      input.value = 'امارات';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(1);
      expect(selectComponent.filteredOptions()[0].id).toBe(1);

      // Query with plain 'الاردن' against 'الْأُرْدُنّ'
      input.value = 'الاردن';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(1);
      expect(selectComponent.filteredOptions()[0].id).toBe(2);
    });

    it('should match Arabic search terms with Yaa and Taa Marbuta variations', () => {
      const { fixture, selectComponent } = createComponent();
      hostComponent.options = [
        { id: 1, name: 'القاهرة' },
        { id: 2, name: 'دبي' },
        { id: 3, name: 'مستشفى' },
      ];
      hostComponent.filter = true;
      hostComponent.filterNormalizeArabic = true;
      hostComponent.optionLabel = 'name';
      hostComponent.optionValue = 'id';
      selectComponent.openOverlay();
      fixture.detectChanges();

      // Query 'القاهره' with 'ه' against 'القاهرة' with 'ة'
      const input = fixture.debugElement.query(By.css('input.form-control')).nativeElement;
      input.value = 'القاهره';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(1);
      expect(selectComponent.filteredOptions()[0].id).toBe(1);

      // Query 'مستشفي' with 'ي' against 'مستشفى' with 'ى'
      input.value = 'مستشفي';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions().length).toBe(1);
      expect(selectComponent.filteredOptions()[0].id).toBe(3);
    });

    it('should apply dir attribute when dir input is set', () => {
      const { fixture } = createComponent((host) => {
        host.dir = 'rtl';
      });

      const container = fixture.debugElement.query(By.css('.ngb-select-container'));
      expect(container.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should support grouped options in RTL layout', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.dir = 'rtl';
        host.group = true;
        host.optionGroupLabel = 'label';
        host.optionGroupChildren = 'items';
        host.options = [
          {
            label: 'دول الخليج العربي',
            items: [
              { id: 1, label: 'الرياض' },
              { id: 2, label: 'أبوظبي' },
            ],
          },
        ];
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const headerEl = fixture.debugElement.query(By.css('.dropdown-header')).nativeElement;
      expect(headerEl).toBeTruthy();
      expect(headerEl.classList.contains('d-flex')).toBe(true);
      expect(headerEl.textContent.trim()).toBe('دول الخليج العربي');
    });

    it('should highlight focused option with focus and bg-body-secondary classes during keyboard traversal', () => {
      const { fixture, selectComponent } = createComponent();
      selectComponent.openOverlay();
      fixture.detectChanges();

      // Trigger ArrowDown to focus item 0
      const container = fixture.debugElement.query(By.css('.ngb-select-container'));
      container.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(selectComponent.focusedIndex()).toBe(0);
      const items = fixture.debugElement.queryAll(By.css('.dropdown-item[role="option"]'));
      expect(items[0].nativeElement.classList.contains('focus')).toBe(true);
      expect(items[0].nativeElement.classList.contains('bg-body-secondary')).toBe(true);

      // Move to item 1
      container.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(selectComponent.focusedIndex()).toBe(1);
      expect(items[1].nativeElement.classList.contains('focus')).toBe(true);
      expect(items[1].nativeElement.classList.contains('bg-body-secondary')).toBe(true);
    });

    it('should set z-index 1060 when appendTo="body"', async () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.appendTo = 'body';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();
      await new Promise((r) => setTimeout(r, 20));
      fixture.detectChanges();

      const dropdown = selectComponent.dropdownMenuElement?.nativeElement;
      expect(dropdown).toBeTruthy();
      expect(dropdown?.style.zIndex).toBe('1060');
    });

    it('should default dropdownPosition to auto', () => {
      const { selectComponent } = createComponent();
      expect(selectComponent.dropdownPosition()).toBe('auto');
      expect(selectComponent.effectiveDropdownPosition()).toBe('auto');
    });

    it('should apply dropup class and set isDropup when dropdownPosition is "top" or "up"', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.dropdownPosition = 'top';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      expect(selectComponent.isDropup()).toBe(true);
      const container = fixture.debugElement.query(By.css('.ngb-select-container'));
      expect(container.nativeElement.classList.contains('dropup')).toBe(true);
      expect(container.nativeElement.classList.contains('dropdown-up')).toBe(true);
    });

    it('should support dropdownDirection and direction input aliases for dropup', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.dropdownDirection = 'up';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      expect(selectComponent.isDropup()).toBe(true);
      const container = fixture.debugElement.query(By.css('.ngb-select-container'));
      expect(container.nativeElement.classList.contains('dropup')).toBe(true);
    });

    it('should open downwards when dropdownPosition is "bottom" or "down"', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.dropdownPosition = 'bottom';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      expect(selectComponent.isDropup()).toBe(false);
      const container = fixture.debugElement.query(By.css('.ngb-select-container'));
      expect(container.nativeElement.classList.contains('dropup')).toBe(false);
    });

    it('should position fixed overlay upwards when appendTo="body" and isDropup is true', async () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.appendTo = 'body';
        host.dropdownPosition = 'top';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();
      await new Promise((r) => setTimeout(r, 20));
      fixture.detectChanges();

      const dropdown = selectComponent.dropdownMenuElement?.nativeElement;
      expect(dropdown).toBeTruthy();
      expect(dropdown?.style.top).toBe('auto');
      expect(dropdown?.style.bottom).toBeTruthy();
    });

    it('should render backdrop and modal dialog header when modal is true', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.modal = true;
        host.popupTitle = 'Select City (Mobile View)';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      expect(selectComponent.isModalMode()).toBe(true);
      const modal = fixture.debugElement.query(By.css('.modal'));
      expect(modal).toBeTruthy();

      const modalHeader = fixture.debugElement.query(By.css('.modal-header'));
      expect(modalHeader).toBeTruthy();
      expect(modalHeader.nativeElement.textContent).toContain('Select City (Mobile View)');

      const modalDialog = fixture.debugElement.query(By.css('.modal-dialog'));
      expect(modalDialog).toBeTruthy();
    });

    it('should close overlay when clicking modal backdrop', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.modal = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const modal = fixture.debugElement.query(By.css('.modal'));
      expect(modal).toBeTruthy();

      modal.nativeElement.click();
      fixture.detectChanges();

      expect(selectComponent.overlayVisible()).toBe(false);
    });

    it('should close overlay when clicking close button in modal header', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.popup = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.modal-header .btn-close'));
      expect(closeBtn).toBeTruthy();

      closeBtn.nativeElement.click();
      fixture.detectChanges();

      expect(selectComponent.overlayVisible()).toBe(false);
    });

    it('should render modal footer with Done button when modal is true and multiple is true', () => {
      const { fixture, selectComponent } = createComponent((host) => {
        host.touchUI = true;
        host.multiple = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const doneBtn = fixture.debugElement.query(By.css('.modal-footer .btn-primary'));
      expect(doneBtn).toBeTruthy();
      expect(doneBtn.nativeElement.textContent).toContain('Done');

      doneBtn.nativeElement.click();
      fixture.detectChanges();

      expect(selectComponent.overlayVisible()).toBe(false);
    });
  });
});
