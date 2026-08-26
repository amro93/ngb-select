# 04. Comprehensive Testing Cases

This document provides extensive guidelines and code snippets for unit testing the `NgbSelectComponent`.

## Setup Requirements

To properly test the component, import the `FormsModule` and construct a host component for `ngModel` interaction.

```typescript
@Component({
  template: `
    <ngb-select
      [options]="options"
      [(ngModel)]="selectedValue"
      [filter]="true"
      optionLabel="name"
      optionValue="id"
    >
    </ngb-select>
  `,
  standalone: true,
  imports: [NgbSelectComponent, FormsModule],
})
class TestHostComponent {
  options = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
  ];
  selectedValue = 1;
}
```

## Category 1: Rendering and Core Initialization

- **Should create successfully:**
  Verify that `fixture.componentInstance` is truthy.

- **Should display correct placeholder when empty:**
  Set `selectedValue = null` and check that the DOM element matching `.text-muted` contains the correct text.

- **Should render options based on input:**
  Trigger a click on `.form-select`, ensure `overlayVisible` is true, and verify `fixture.debugElement.queryAll(By.css('.dropdown-item'))` equals `options.length`.

## Category 2: Interactions and Forms (ControlValueAccessor)

- **Should update internal model when clicking an option:**

  ```typescript
  it('should update model on click', async () => {
    // Open dropdown
    fixture.debugElement.query(By.css('.form-select')).nativeElement.click();
    fixture.detectChanges();

    // Click 'Banana'
    const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
    items[1].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(hostComponent.selectedValue).toBe(2);
  });
  ```

- **Should reflect programmatic changes to ngModel in UI:**
  Update `hostComponent.selectedValue = 2`, run `fixture.detectChanges()`, and verify the displayed text within `.form-select` is 'Banana'.

## Category 3: Filtering and Search

- **Should filter options array when typing:**

  ```typescript
  it('should filter items', () => {
    component.options = [{ label: 'Cat' }, { label: 'Dog' }, { label: 'Cow' }];
    component.filter = true;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.form-control')).nativeElement;
    input.value = 'c';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredOptions.length).toBe(2); // Cat, Cow
  });
  ```

- **Should display emptyMessage when filter matches nothing:**
  Type a string with no matches and verify `.dropdown-item.text-muted` appears showing `emptyFilterMessage`.

## Category 4: Grouping

- **Should render group headers:**
  Provide nested grouping data to `options`. Verify that `By.css('.dropdown-header')` exists and contains the correct `optionGroupLabel`.

- **Should prevent clicking group headers:**
  Ensure the `.dropdown-header` elements do not bind to `(click)="selectOption()"` and have no hover/active states.

## Category 5: Accessibility and Keyboard

- **Should navigate options via keyboard (Arrow Down/Up):**
  Dispatch a `KeyboardEvent` (ArrowDown). Verify that the `active` index increments and the corresponding item receives visual focus or `.active` styling.

- **Should close dropdown on Escape:**
  While open, emit `KeyboardEvent(Escape)` and expect `overlayVisible` to be false.

## Category 6: Robustness and Edge Cases

- **Should handle null or undefined options array gracefully without throwing errors:**
  Set `component.options = null` and invoke the filter method; verify no errors occur.

- **Should handle empty strings or nulls as valid values:**
  Bind `hostComponent.selectedValue = ''` or `null` and ensure the component renders the empty state or placeholder appropriately.

- **Should integrate properly with Angular Reactive Forms (FormControl):**
  Bind `[formControl]="control"` instead of `[(ngModel)]` and ensure value updates flow back and forth seamlessly.

- **Should support Angular Signals Form binding (model):**
  Ensure that when the component writes a new value, the corresponding signal `valueSignal.set(val)` correctly notifies parent components natively utilizing Signal-based forms.

## Category 7: Advanced Features (Parity with PrimeNG)

- **`dataKey` Equality Check:**

  ```typescript
  it('should correctly select objects using dataKey', () => {
    component.dataKey = 'id';
    component.options = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    component.writeValue({ id: 2, name: 'Different Object Reference' });
    fixture.detectChanges();

    // Validate that option {id: 2} is visually selected
    expect(component.isSelected(component.options[1])).toBeTrue();
  });
  ```

- **Editable Combobox:**
  Verify that when `editable=true`, an `<input>` is rendered instead of a `<span>`, and typing into it updates the model directly via the `onEditableInput` event and enforces `maxLength` if provided.

- **Lazy Loading (Infinite Scroll):**
  Simulate a scroll event reaching the bottom of the `.dropdown-menu` (`scrollTop + clientHeight >= scrollHeight`) and verify that the `onLazyLoad` event is emitted.

- **`filterMatchMode` logic:**
  Test that `startsWith` correctly excludes items that only contain the substring in the middle, whereas `contains` includes them. Ensure `filterLocale` is respected using `.toLocaleLowerCase(locale)`.

- **AppendTo Body Constraint:**
  Assert that when `appendTo="body"`, the `.dropdown-menu` element is attached directly as a child of `document.body` instead of living inside the `.form-select` wrapper. This ensures it isn't clipped by overflow containers.

- **Two-way Overlay Visibility Binding:**
  Bind `[(overlayVisible)]="isOpen"` in the host component and verify that manually toggling `isOpen` opens/closes the dropdown, and that interacting with the component triggers the `overlayVisibleChange` emitter.

## Category 8: Multi-Select Testing Scenarios

- **Multi-Select Value Array Initialization:**

  ```typescript
  it('should initialize multi-select with array of values', () => {
    component.multiple = true;
    component.options = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ];
    component.writeValue([1, 2]);
    fixture.detectChanges();

    expect(component.isSelected(component.options[0])).toBeTrue();
    expect(component.isSelected(component.options[1])).toBeTrue();
    expect(component.isSelected(component.options[2])).toBeFalse();
  });
  ```

- **Keep Overlay Open on Multiple Selection:**
  Verify that when `multiple=true` and `closeOnSelect=false` (default), selecting an item toggles its inclusion in `value` array and leaves `overlayVisible` true.

- **Select All Checkbox Functionality:**

  ```typescript
  it('should select and deselect all options via Select All checkbox', () => {
    component.multiple = true;
    component.showSelectAll = true;
    component.options = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    fixture.detectChanges();

    const selectAllCheckbox = fixture.debugElement.query(
      By.css('#selectAllCheckbox'),
    ).nativeElement;
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.value.length).toBe(2);
    expect(component.selectAll).toBeTrue();
  });
  ```

- **Chips Display and Removal:**
  Verify that with `display="chip"`, multiple `.badge` elements are rendered in the trigger, and clicking the close icon (`bi-x`) removes that specific item from the model and emits `onRemoveChip`.

- **Selection Limit Enforcement:**
  Set `selectionLimit=2`. Attempt to select a 3rd option and verify that the selection array length remains 2 and no additional option is added.

- **Max Selected Labels Summary:**
  Set `maxSelectedLabels=2` and select 3 items. Verify that the trigger renders the formatted label from `selectedItemsLabel` (e.g. `'3 items selected'`) instead of comma-separated text.

## Category 9: RTL and Arabic Localization Testing Scenarios

- **RTL Direction Attribute Inheritance:**
  Verify that when placed in an element with `dir="rtl"`, the component's internal container mirrors layout correctly using Bootstrap's directional CSS classes (`ms-*`, `me-*`, `text-start`).

- **Arabic Text Search Normalization (Alef, Yaa, Taa Marbuta):**

  ```typescript
  it('should match Arabic search terms regardless of Alef forms or Tashkeel', () => {
    component.options = [
      { id: 1, name: 'الإمارات' },
      { id: 2, name: 'الْأُرْدُنّ' }, // with Tashkeel diacritics
      { id: 3, name: 'مصر' },
    ];
    component.filter = true;
    component.filterNormalizeArabic = true;
    fixture.detectChanges();

    // Query with bare Alef 'امارات'
    const input = fixture.debugElement.query(By.css('.form-control')).nativeElement;
    input.value = 'امارات';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].id).toBe(1);

    // Query with plain 'الاردن' against 'الْأُرْدُنّ'
    input.value = 'الاردن';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].id).toBe(2);
  });
  ```

- **Arabic Chips & Close Icon Alignment in RTL:**
  Verify that inside an RTL container, chip close buttons are positioned cleanly on the left (the logical end in RTL), without text overlap.
