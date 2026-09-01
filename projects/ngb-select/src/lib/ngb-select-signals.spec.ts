import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbSelectComponent } from './ngb-select.component';

describe('NgbSelectComponent Signals & Computations', () => {
  let fixture: ComponentFixture<NgbSelectComponent>;
  let component: NgbSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgbSelectComponent);
    component = fixture.componentInstance;
    // We don't call fixture.detectChanges() here automatically to allow input setting
  });

  it('should compute safeOptions correctly', () => {
    fixture.componentRef.setInput('options', null);
    fixture.detectChanges();
    expect(component.safeOptions()).toEqual([]);

    fixture.componentRef.setInput('options', [{ id: 1 }]);
    fixture.detectChanges();
    expect(component.safeOptions()).toEqual([{ id: 1 }]);
  });

  it('should compute effectiveSearchPlaceholder based on priority', () => {
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Search...');

    fixture.componentRef.setInput('placeholder', 'Base');
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Base');

    fixture.componentRef.setInput('filterPlaceholder', 'Filter');
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Filter');

    fixture.componentRef.setInput('searchPlaceholder', 'Search');
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Search');
  });

  it('should compute hasSelectedValue correctly for single mode', () => {
    fixture.componentRef.setInput('multiple', false);
    fixture.detectChanges();

    expect(component.hasSelectedValue()).toBe(false);

    component.value.set('A');
    expect(component.hasSelectedValue()).toBe(true);

    component.value.set('');
    expect(component.hasSelectedValue()).toBe(false);

    component.value.set(null);
    expect(component.hasSelectedValue()).toBe(false);
  });

  it('should compute hasSelectedValue correctly for multiple mode', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();

    expect(component.hasSelectedValue()).toBe(false);

    component.value.set(['A']);
    expect(component.hasSelectedValue()).toBe(true);

    component.value.set([]);
    expect(component.hasSelectedValue()).toBe(false);

    component.value.set(null);
    expect(component.hasSelectedValue()).toBe(false);
  });

  it('should handle overlayVisible model two-way binding naturally', () => {
    fixture.detectChanges();

    expect(component.overlayVisible()).toBe(false);

    // Setting internally reflects in the model
    component.openOverlay();
    expect(component.overlayVisible()).toBe(true);

    component.closeOverlay();
    expect(component.overlayVisible()).toBe(false);

    // Setting externally sets the signal
    fixture.componentRef.setInput('overlayVisible', true);
    fixture.detectChanges();
    expect(component.overlayVisible()).toBe(true);
  });

  it('should compute filteredOptions and flatFilteredOptions reactively', () => {
    const items = [
      { name: 'Apple', code: 'AP' },
      { name: 'Banana', code: 'BN' },
      { name: 'Cherry', code: 'CH' },
    ];
    fixture.componentRef.setInput('options', items);
    fixture.componentRef.setInput('optionLabel', 'name');
    fixture.detectChanges();

    expect(component.filteredOptions().length).toBe(3);
    expect(component.flatFilteredOptions().length).toBe(3);
    expect(component.isOptionsEmpty()).toBe(false);

    component.filterValue.set('ban');
    expect(component.filteredOptions()).toEqual([{ name: 'Banana', code: 'BN' }]);
    expect(component.flatFilteredOptions()).toEqual([{ name: 'Banana', code: 'BN' }]);

    component.filterValue.set('xyz');
    expect(component.filteredOptions()).toEqual([]);
    expect(component.flatFilteredOptions()).toEqual([]);
    expect(component.isOptionsEmpty()).toBe(true);
  });

  it('should compute displayLabel reactively', () => {
    const items = [
      { name: 'Apple', code: 'AP' },
      { name: 'Banana', code: 'BN' },
    ];
    fixture.componentRef.setInput('options', items);
    fixture.componentRef.setInput('optionLabel', 'name');
    fixture.componentRef.setInput('optionValue', 'code');
    fixture.detectChanges();

    expect(component.displayLabel()).toBe('');

    component.value.set('AP');
    expect(component.displayLabel()).toBe('Apple');

    // Multi-mode
    fixture.componentRef.setInput('multiple', true);
    component.value.set(['AP', 'BN']);
    expect(component.displayLabel()).toBe('Apple, Banana');

    fixture.componentRef.setInput('maxSelectedLabels', 1);
    expect(component.displayLabel()).toBe('2 items selected');
  });

  it('should compute selectAll reactively for multiple selection', () => {
    const items = [
      { name: 'Apple', code: 'AP' },
      { name: 'Banana', code: 'BN' },
    ];
    fixture.componentRef.setInput('options', items);
    fixture.componentRef.setInput('optionValue', 'code');
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('showSelectAll', true);
    fixture.detectChanges();

    expect(component.selectAll()).toBe(false);

    component.value.set(['AP']);
    expect(component.selectAll()).toBe(false);

    component.value.set(['AP', 'BN']);
    expect(component.selectAll()).toBe(true);
  });

  it('should compute focusedOption reactively', () => {
    const items = ['First', 'Second', 'Third'];
    fixture.componentRef.setInput('options', items);
    fixture.detectChanges();

    expect(component.focusedOption()).toBeUndefined();

    component.focusedIndex.set(1);
    expect(component.focusedOption()).toBe('Second');
    expect(component.isOptionFocused('Second')).toBe(true);
    expect(component.isOptionFocused('First')).toBe(false);
  });

  it('should use O(1) map and set for fast option resolution and selection check', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    fixture.componentRef.setInput('options', items);
    fixture.componentRef.setInput('dataKey', 'id');
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();

    component.value.set([items[0], items[2]]);
    expect(component.isSelected(items[0])).toBe(true);
    expect(component.isSelected(items[1])).toBe(false);
    expect(component.isSelected(items[2])).toBe(true);

    expect(component.findOptionByValue(items[1])).toEqual(items[1]);
  });
});
