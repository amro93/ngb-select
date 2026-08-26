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
        [invalid]="invalid"
        [editable]="editable"
        [dataKey]="dataKey"
        [size]="size"
        [focusOnOpen]="focusOnOpen"
        [(overlayVisible)]="overlayVisible"
        (onChange)="onSelectChange($event)"
        (onFilter)="onFilterChange($event)"
        (onClear)="onClearChange($event)">
      </ngb-select>
    </form>
  `
})
class TestHostComponent {
  options: any[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN', disabled: true },
    { name: 'Paris', code: 'PRS' }
  ];

  placeholder = 'Select a city';
  filter = false;
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
  invalid = false;
  editable = false;
  dataKey?: string;
  size?: any;
  focusOnOpen?: number;
  overlayVisible = false;

  form = new FormGroup({
    selectedCity: new FormControl<any>(null)
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
    selectComponent = fixture.debugElement.query(By.directive(NgbSelectComponent)).componentInstance;
    return { fixture, hostComponent, selectComponent };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgbSelectComponent]
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

    it('should apply floating label class when floatLabel is true', () => {
      const { fixture } = createComponent(host => {
        host.floatLabel = true;
      });

      const container = fixture.debugElement.query(By.css('.ngb-select-container'));
      expect(container.nativeElement.classList.contains('form-floating')).toBe(true);
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
      expect(selectComponent.overlayVisible).toBe(false);
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
      const { fixture, selectComponent } = createComponent(host => {
        host.filter = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      expect(input).toBeTruthy();
    });

    it('should filter options list based on filter input', () => {
      const { fixture, selectComponent } = createComponent(host => {
        host.filter = true;
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      input.nativeElement.value = 'Rom';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions.length).toBe(1);
      expect(selectComponent.filteredOptions[0].name).toBe('Rome');
    });

    it('should display empty message when filter produces no matches', () => {
      const { fixture, selectComponent } = createComponent(host => {
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
      const { fixture, selectComponent } = createComponent(host => {
        host.filter = true;
        host.filterMatchMode = 'startsWith';
      });
      selectComponent.openOverlay();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input.form-control'));
      input.nativeElement.value = 'on'; // 'London' contains 'on', but doesn't start with 'on'
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(selectComponent.filteredOptions.length).toBe(0);
    });
  });

  // ==========================================
  // Category 4: Grouping
  // ==========================================
  describe('Category 4: Grouping', () => {
    it('should render group headers correctly', () => {
      const { fixture, selectComponent } = createComponent(host => {
        host.group = true;
        host.optionGroupLabel = 'country';
        host.optionGroupChildren = 'cities';
        host.options = [
          {
            country: 'USA',
            cities: [
              { name: 'Chicago', code: 'CHI' },
              { name: 'Los Angeles', code: 'LA' }
            ]
          },
          {
            country: 'Italy',
            cities: [{ name: 'Rome', code: 'RM' }]
          }
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
      const { fixture, hostComponent, selectComponent } = createComponent(host => {
        host.group = true;
        host.optionGroupLabel = 'country';
        host.optionGroupChildren = 'cities';
        host.options = [
          {
            country: 'USA',
            cities: [
              { name: 'Chicago', code: 'CHI' },
              { name: 'Los Angeles', code: 'LA' }
            ]
          }
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
      const { fixture, hostComponent } = createComponent(host => {
        host.showClear = true;
      });
      hostComponent.form.get('selectedCity')?.setValue('NY');
      fixture.detectChanges();

      const clearIcon = fixture.debugElement.query(By.css('.ngb-select-clear-icon'));
      expect(clearIcon).toBeTruthy();
    });

    it('should reset value when clear icon is clicked', () => {
      const { fixture, hostComponent } = createComponent(host => {
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
      const { fixture, selectComponent, hostComponent } = createComponent(host => {
        host.form.get('selectedCity')?.disable();
      });

      const trigger = fixture.debugElement.query(By.css('.form-select'));
      trigger.nativeElement.click();
      fixture.detectChanges();

      expect(selectComponent.overlayVisible).toBe(false);
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
      const { fixture } = createComponent(host => {
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
      const { selectComponent } = createComponent(host => {
        host.options = null as any;
      });

      expect(() => {
        selectComponent.openOverlay();
        selectComponent.updateFilteredOptions();
      }).not.toThrow();
    });

    it('should handle empty string as valid selection value', () => {
      const { hostComponent, selectComponent } = createComponent(host => {
        host.options = [{ name: 'None', code: '' }];
      });
      hostComponent.form.get('selectedCity')?.setValue('');
      fixture.detectChanges();

      expect(selectComponent.value).toBe('');
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
      selectComponent.optionValue = undefined as any; // Full object mode
      selectComponent.dataKey = 'code';
      selectComponent.options = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' }
      ];
      selectComponent.writeValue({ name: 'Rome (Different ref)', code: 'RM' });
      fixture.detectChanges();

      expect(selectComponent.isSelected(selectComponent.options[1])).toBe(true);
    });

    it('should support editable combobox input typing', () => {
      const { fixture, hostComponent } = createComponent(host => {
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
      const { fixture, selectComponent } = createComponent(host => {
        host.focusOnOpen = 1;
      });

      selectComponent.openOverlay();
      fixture.detectChanges();
      await new Promise(r => setTimeout(r, 20));

      expect(selectComponent.focusedIndex).toBe(1);
    });

    it('should support two-way binding on overlayVisible', async () => {
      const { fixture, hostComponent, selectComponent } = createComponent();
      selectComponent.openOverlay();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(selectComponent.overlayVisible).toBe(true);
      expect(hostComponent.overlayVisible).toBe(true);
    });
  });
});
