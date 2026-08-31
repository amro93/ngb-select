import {
  Component,
  forwardRef,
  ElementRef,
  ViewChild,
  ContentChild,
  TemplateRef,
  HostListener,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  input,
  output,
  model,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  SelectOption,
  SelectFilterMatchMode,
  SelectSize,
  SelectVariant,
  SelectDisplayMode,
  FocusOnOpenStrategy,
  FloatLabelVariant,
  SelectChangeEvent,
  SelectFilterEvent,
  SelectSelectAllChangeEvent,
  SelectRemoveChipEvent,
  SelectLazyLoadEvent,
  NGB_SELECT_VERSION,
} from './ngb-select.interface';

@Component({
  selector: 'ngb-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ngb-select.component.html',
  styleUrls: ['./ngb-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgbSelectComponent),
      multi: true,
    },
  ],
})
export class NgbSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  public static readonly VERSION = NGB_SELECT_VERSION;

  // --- Basic & Data Inputs ---
  options = input<any[]>([]);
  optionLabel = input<string>('label');
  optionValue = input<string>('value');
  optionDisabled = input<string>('disabled');
  optionGroupLabel = input<string>('label');
  optionGroupChildren = input<string>('items');
  group = input<boolean>(false);
  dataKey = input<string | undefined>(undefined);
  placeholder = input<string | undefined>(undefined);

  // --- Multi-Select Inputs ---
  multiple = input<boolean>(false);
  display = input<SelectDisplayMode>('comma');
  showSelectAll = input<boolean>(false);
  maxSelectedLabels = input<number>(3);
  selectedItemsLabel = input<string>('{0} items selected');
  selectionLimit = input<number | undefined>(undefined);
  closeOnSelect = input<boolean>(false);

  // --- Filtering Inputs ---
  filter = input<boolean>(false);
  filterBy = input<string | undefined>(undefined);
  filterMatchMode = input<SelectFilterMatchMode>('contains');
  filterLocale = input<string | undefined>(undefined);
  filterNormalizeArabic = input<boolean>(true);
  filterPlaceholder = input<string | undefined>(undefined);
  searchPlaceholder = input<string | undefined>(undefined);
  filterInTrigger = input<boolean>(false);
  resetFilterOnHide = input<boolean>(false);
  emptyMessage = input<string>('No results found');
  emptyFilterMessage = input<string>('No results found');

  // --- State & Form Inputs ---
  disabled = model<boolean>(false);
  readonly = input<boolean>(false);
  loading = input<boolean>(false);
  showClear = input<boolean>(false);
  invalid = input<boolean>(false);
  floatLabel = input<boolean>(false);
  floatLabelVariant = input<FloatLabelVariant>('on');
  autofocus = input<boolean>(false);
  tabindex = input<number>(0);
  id = input<string | undefined>(undefined);
  ariaLabel = input<string | undefined>(undefined);
  ariaLabelledBy = input<string | undefined>(undefined);
  dir = input<'ltr' | 'rtl' | 'auto' | undefined>(undefined);

  // --- Display & Styling Inputs ---
  size = input<SelectSize | undefined>(undefined);
  variant = input<SelectVariant>('outlined');
  fluid = input<boolean>(false);
  scrollHeight = input<string>('200px');
  style = input<{ [klass: string]: any } | null | undefined>(undefined);
  styleClass = input<string | undefined>(undefined);
  panelStyle = input<{ [klass: string]: any } | null | undefined>(undefined);
  panelStyleClass = input<string | undefined>(undefined);
  appendTo = input<'body' | HTMLElement | string | undefined>(undefined);

  // --- Advanced Features ---
  editable = input<boolean>(false);
  maxLength = input<number | undefined>(undefined);
  selectOnFocus = input<boolean>(false);
  autoOptionFocus = input<boolean>(true);
  focusOnOpen = input<number | undefined>(undefined);
  focusOnOpenStrategy = input<FocusOnOpenStrategy>('always');
  lazy = input<boolean>(false);

  // --- Two-way Overlay Visibility Binding ---
  overlayVisible = model<boolean>(false);

  // --- Event Outputs ---
  onChange = output<SelectChangeEvent>();
  onFilter = output<SelectFilterEvent>();
  onFocus = output<Event>();
  onBlur = output<Event>();
  onShow = output<Event | null>();
  onHide = output<Event | null>();
  onClear = output<Event>();
  onSelectAllChange = output<SelectSelectAllChangeEvent>();
  onRemoveChip = output<SelectRemoveChipEvent>();
  onLazyLoad = output<SelectLazyLoadEvent>();

  // --- Custom Content Templates ---
  @ContentChild('item') itemTemplate?: TemplateRef<any>;
  @ContentChild('selectedItem') selectedItemTemplate?: TemplateRef<any>;
  @ContentChild('label') labelTemplate?: TemplateRef<any>;
  @ContentChild('chip') chipTemplate?: TemplateRef<any>;
  @ContentChild('headerCheckbox') headerCheckboxTemplate?: TemplateRef<any>;
  @ContentChild('header') headerTemplate?: TemplateRef<any>;
  @ContentChild('footer') footerTemplate?: TemplateRef<any>;
  @ContentChild('group') groupTemplate?: TemplateRef<any>;
  @ContentChild('empty') emptyTemplate?: TemplateRef<any>;
  @ContentChild('clearIcon') clearIconTemplate?: TemplateRef<any>;
  @ContentChild('dropdownIcon') dropdownIconTemplate?: TemplateRef<any>;
  @ContentChild('filterIcon') filterIconTemplate?: TemplateRef<any>;

  // --- View References ---
  @ViewChild('filterInput') filterInputElement?: ElementRef<HTMLInputElement>;
  @ViewChild('triggerFilterInput') triggerFilterInputElement?: ElementRef<HTMLInputElement>;
  @ViewChild('editableInput') editableInputElement?: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownMenu') dropdownMenuElement?: ElementRef<HTMLDivElement>;

  effectiveSearchPlaceholder = computed(() => {
    return this.searchPlaceholder() || this.filterPlaceholder() || this.placeholder() || 'Search...';
  });

  effectiveFilterValue = computed(() => {
    return this.overlayVisible()
      ? this.filterValue()
      : this.hasSelectedValue()
        ? ''
        : this.filterValue();
  });

  // --- Internal State ---
  public value = signal<any>(null);
  public filteredOptions = signal<any[]>([]);
  public filterValue = signal<string>('');
  public focusedIndex = signal<number>(-1);
  public selectAll = signal<boolean | null>(null);

  // --- ControlValueAccessor Callbacks ---
  private onModelChange: (value: any) => void = () => {};
  private onModelTouched: () => void = () => {};

  constructor(
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      // React to options or group changes
      this.options();
      this.group();
      this.updateFilteredOptions();
      this.updateSelectAllState();
    });

    effect(() => {
      // React to overlayVisible changes
      const visible = this.overlayVisible();
      if (visible) {
        this.openOverlay();
      } else {
        this.closeOverlay();
      }
    });
  }

  ngOnInit(): void {
    if (this.autofocus()) {
      setTimeout(() => this.focus());
    }
  }

  ngOnDestroy(): void {
    this.cleanAppendTo();
  }

  safeOptions = computed(() => {
    const opts = this.options();
    return Array.isArray(opts) ? opts : [];
  });

  writeValue(obj: any): void {
    if (this.multiple()) {
      this.value.set(Array.isArray(obj) ? [...obj] : []);
    } else {
      this.value.set(obj !== undefined ? obj : null);
    }
    this.updateSelectAllState();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.cdr.markForCheck();
  }

  hasSelectedValue = computed(() => {
    const val = this.value();
    if (this.multiple()) {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== null && val !== undefined && val !== '';
  });

  getDisplayLabel(): string {
    if (!this.hasSelectedValue()) {
      return '';
    }

    if (this.multiple()) {
      const selectedList = Array.isArray(this.value()) ? this.value() : [];
      if (selectedList.length > this.maxSelectedLabels()) {
        return this.selectedItemsLabel().replace('{0}', String(selectedList.length));
      }
      return selectedList.map((val: any) => this.resolveOptionLabelByValue(val)).join(', ');
    }

    if (this.editable() && typeof this.value() === 'string') {
      return this.value();
    }

    return this.resolveOptionLabelByValue(this.value());
  }

  resolveOptionLabelByValue(val: any): string {
    const selectedOpt = this.findOptionByValue(val);
    if (selectedOpt !== undefined && selectedOpt !== null) {
      return this.resolveOptionLabel(selectedOpt);
    }
    return this.resolveOptionLabel(val);
  }

  resolveOptionLabel(option: any): string {
    if (option === null || option === undefined) return '';
    if (typeof option === 'object') {
      if (this.optionLabel() && option[this.optionLabel()] !== undefined) {
        return String(option[this.optionLabel()]);
      }
      if (option.label !== undefined) {
        return String(option.label);
      }
      return JSON.stringify(option);
    }
    return String(option);
  }

  resolveOptionValue(option: any): any {
    if (option === null || option === undefined) return null;
    if (typeof option === 'object') {
      if (this.optionValue() && option[this.optionValue()] !== undefined) {
        return option[this.optionValue()];
      }
      if (option.value !== undefined) {
        return option.value;
      }
    }
    return option;
  }

  isOptionDisabled(option: any): boolean {
    if (this.disabled()) return true;
    if (option && typeof option === 'object') {
      if (this.optionDisabled() && option[this.optionDisabled()] !== undefined) {
        return Boolean(option[this.optionDisabled()]);
      }
      return Boolean(option.disabled);
    }
    return false;
  }

  resolveOptionGroupLabel(groupOption: any): string {
    if (!groupOption) return '';
    if (this.optionGroupLabel() && groupOption[this.optionGroupLabel()] !== undefined) {
      return String(groupOption[this.optionGroupLabel()]);
    }
    return String(groupOption.label || '');
  }

  resolveOptionGroupChildren(groupOption: any): any[] {
    if (!groupOption) return [];
    if (this.optionGroupChildren() && Array.isArray(groupOption[this.optionGroupChildren()])) {
      return groupOption[this.optionGroupChildren()];
    }
    return Array.isArray(groupOption.items) ? groupOption.items : [];
  }

  findOptionByValue(val: any): any {
    if (val === null || val === undefined) return undefined;
    if (this.group()) {
      for (const grp of this.safeOptions()) {
        const children = this.resolveOptionGroupChildren(grp);
        const match = children.find((opt) =>
          this.areValuesEqual(this.resolveOptionValue(opt), val),
        );
        if (match !== undefined) return match;
      }
      return undefined;
    }
    return this.safeOptions().find((opt) => this.areValuesEqual(this.resolveOptionValue(opt), val));
  }

  areValuesEqual(val1: any, val2: any): boolean {
    if (val1 === val2) return true;
    if (val1 === null || val1 === undefined || val2 === null || val2 === undefined) return false;
    if (typeof val1 === 'object' && typeof val2 === 'object') {
      const dataKey = this.dataKey();
      if (dataKey && val1[dataKey] !== undefined && val2[dataKey] !== undefined) {
        return val1[dataKey] === val2[dataKey];
      }
      if (
        this.optionValue() &&
        val1[this.optionValue()] !== undefined &&
        val2[this.optionValue()] !== undefined
      ) {
        return val1[this.optionValue()] === val2[this.optionValue()];
      }
      try {
        return JSON.stringify(val1) === JSON.stringify(val2);
      } catch {
        return false;
      }
    }
    return false;
  }

  isSelected(option: any): boolean {
    const optVal = this.resolveOptionValue(option);
    if (this.multiple() && Array.isArray(this.value())) {
      return this.value().some((item: any) => this.areValuesEqual(item, optVal));
    }
    return this.areValuesEqual(this.value(), optVal);
  }

  isOptionsEmpty(): boolean {
    if (this.filteredOptions().length === 0) return true;
    if (this.group()) {
      return this.filteredOptions().every((grp) => this.resolveOptionGroupChildren(grp).length === 0);
    }
    return false;
  }

  onTriggerClick(event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;
    this.toggleOverlay(event);
  }

  toggleOverlay(event?: Event): void {
    if (this.overlayVisible()) {
      this.closeOverlay(event);
    } else {
      this.openOverlay(event);
    }
  }

  openOverlay(event?: Event): void {
    if (this.disabled() || this.readonly() || this.overlayVisible()) return;

    this.overlayVisible.set(true);
    this.onShow.emit(event || null);
    this.onModelTouched();

    setTimeout(() => {
      if (this.filterInTrigger() && this.triggerFilterInputElement) {
        this.triggerFilterInputElement.nativeElement.focus();
      } else if (this.filter() && this.filterInputElement) {
        this.filterInputElement.nativeElement.focus();
      }
      this.handleFocusOnOpen();
      this.handleAppendTo();
      this.cdr.markForCheck();
    });
  }

  closeOverlay(event?: Event): void {
    if (!this.overlayVisible()) return;

    this.overlayVisible.set(false);
    this.onHide.emit(event || null);

    if (this.resetFilterOnHide() && this.filterValue()) {
      this.filterValue.set('');
      this.updateFilteredOptions();
    }
    this.focusedIndex.set(-1);
    this.cdr.markForCheck();
  }

  private handleFocusOnOpen(): void {
    const flatItems = this.getFlatFilteredOptions();
    let targetIndex = -1;

    const hasSelection = this.hasSelectedValue();
    const selectedIdx = flatItems.findIndex((opt) => this.isSelected(opt));

    const focusOnOpen = this.focusOnOpen();
    if (
      focusOnOpen !== undefined &&
      focusOnOpen >= 0 &&
      focusOnOpen < flatItems.length
    ) {
      if (this.focusOnOpenStrategy() === 'notSelected' && hasSelection && selectedIdx !== -1) {
        targetIndex = selectedIdx;
      } else {
        targetIndex = focusOnOpen;
      }
    } else if (this.autoOptionFocus()) {
      targetIndex = selectedIdx !== -1 ? selectedIdx : 0;
    }

    if (targetIndex !== -1 && this.dropdownMenuElement) {
      this.focusedIndex.set(targetIndex);
      const elements = this.dropdownMenuElement.nativeElement.querySelectorAll(
        '.dropdown-item[role="option"]',
      );
      const targetElement = elements[targetIndex] as HTMLElement;
      if (targetElement && typeof targetElement.scrollIntoView === 'function') {
        targetElement.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    }
  }

  onOptionClick(option: any, event: Event): void {
    if (this.isOptionDisabled(option)) return;

    const val = this.resolveOptionValue(option);

    if (this.multiple()) {
      let currentSelection: any[] = Array.isArray(this.value()) ? [...this.value()] : [];
      const selectedIndex = currentSelection.findIndex((item) => this.areValuesEqual(item, val));

      if (selectedIndex !== -1) {
        currentSelection.splice(selectedIndex, 1);
      } else {
        if (this.selectionLimit() !== undefined && currentSelection.length >= this.selectionLimit()!) {
          return;
        }
        currentSelection.push(val);
      }

      this.updateModel(currentSelection, event);
      this.updateSelectAllState();

      if (this.closeOnSelect()) {
        this.closeOverlay(event);
      }
    } else {
      this.updateModel(val, event);
      if (this.filterInTrigger()) {
        this.filterValue.set('');
        this.updateFilteredOptions();
        if (this.triggerFilterInputElement) {
          this.triggerFilterInputElement.nativeElement.value = '';
        }
      }
      this.closeOverlay(event);
    }
  }

  removeChip(val: any, event: Event): void {
    event.stopPropagation();
    if (this.disabled() || this.readonly()) return;

    if (Array.isArray(this.value())) {
      const nextVal = this.value().filter((item: any) => !this.areValuesEqual(item, val));
      this.updateModel(nextVal, event);
      this.onRemoveChip.emit({ originalEvent: event, value: val });
      this.updateSelectAllState();
    }
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const targetOptions = this.getFlatFilteredOptions().filter(
      (opt) => !this.isOptionDisabled(opt),
    );

    if (checked) {
      let allValues = targetOptions.map((opt) => this.resolveOptionValue(opt));
      if (this.selectionLimit() !== undefined) {
        allValues = allValues.slice(0, this.selectionLimit());
      }
      this.value.set(allValues);
    } else {
      this.value.set([]);
    }

    this.selectAll.set(checked);
    this.updateModel(this.value(), event);
    this.onSelectAllChange.emit({ originalEvent: event, checked });
  }

  updateSelectAllState(): void {
    if (!this.multiple() || !this.showSelectAll()) return;
    const targetOptions = this.getFlatFilteredOptions().filter(
      (opt) => !this.isOptionDisabled(opt),
    );
    if (targetOptions.length === 0) {
      this.selectAll.set(false);
      return;
    }
    this.selectAll.set(targetOptions.every((opt) => this.isSelected(opt)));
  }

  private updateModel(val: any, event: Event | null): void {
    this.value.set(val);
    this.onModelChange(this.value());
    this.onChange.emit({
      originalEvent: event,
      value: this.value(),
    });
    this.cdr.markForCheck();
  }

  onClearClick(event: Event): void {
    event.stopPropagation();
    if (this.disabled() || this.readonly()) return;

    const clearedValue = this.multiple() ? [] : null;
    this.updateModel(clearedValue, event);
    this.updateSelectAllState();
    this.onClear.emit(event);
  }

  onEditableInput(event: Event): void {
    const inputVal = (event.target as HTMLInputElement).value;
    this.updateModel(inputVal, event);
  }

  onEditableFocus(event: FocusEvent): void {
    if (this.selectOnFocus() && this.editableInputElement) {
      this.editableInputElement.nativeElement.select();
    }
    this.onFocus.emit(event);
  }

  onFilterChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value || '';
    this.filterValue.set(raw);
    this.updateFilteredOptions();
    this.updateSelectAllState();
    this.onFilter.emit({
      originalEvent: event,
      filter: this.filterValue(),
    });
  }

  updateFilteredOptions(): void {
    if (!this.filterValue()) {
      this.filteredOptions.set([...this.safeOptions()]);
      return;
    }

    const query = this.filterValue();

    if (this.group()) {
      this.filteredOptions.set(this.safeOptions()
        .map((group) => {
          const children = this.resolveOptionGroupChildren(group);
          const filteredChildren = children.filter((opt) => this.matchesFilter(opt, query));
          return {
            ...group,
            [this.optionGroupChildren()]: filteredChildren,
          };
        })
        .filter((group) => this.resolveOptionGroupChildren(group).length > 0));
    } else {
      this.filteredOptions.set(this.safeOptions().filter((opt) => this.matchesFilter(opt, query)));
    }
  }

  private matchesFilter(option: any, query: string): boolean {
    if (!option) return false;
    const fieldsToSearch = this.getFilterFields();

    return fieldsToSearch.some((field) => {
      const val = this.resolveFieldData(option, field);
      if (val === null || val === undefined) return false;

      const stringVal = String(val);
      return this.compareStrings(stringVal, query, this.filterMatchMode(), this.filterLocale());
    });
  }

  private getFilterFields(): string[] {
    if (this.filterBy()) {
      return this.filterBy()!.split(',').map((f) => f.trim());
    }
    return [this.optionLabel() || 'label'];
  }

  private resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') === -1) {
        return data[field] !== undefined
          ? data[field]
          : typeof data === 'string' || typeof data === 'number'
            ? data
            : null;
      }
      const fields = field.split('.');
      let value = data;
      for (const f of fields) {
        if (value === null || value === undefined) return null;
        value = value[f];
      }
      return value;
    }
    return null;
  }

  private normalizeArabicText(text: string): string {
    return text
      .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // Remove Arabic Tashkeel diacritics & Tatweel
      .replace(/[إأآا]/g, 'ا') // Normalize Alef forms
      .replace(/[يى]/g, 'ي') // Normalize Yaa & Alef Maksura
      .replace(/[ة]/g, 'ه'); // Normalize Taa Marbuta
  }

  private compareStrings(
    val: string,
    query: string,
    mode: SelectFilterMatchMode,
    locale?: string,
  ): boolean {
    let v = locale ? val.toLocaleLowerCase(locale) : val.toLowerCase();
    let q = locale ? query.toLocaleLowerCase(locale) : query.toLowerCase();

    if (this.filterNormalizeArabic()) {
      v = this.normalizeArabicText(v);
      q = this.normalizeArabicText(q);
    }

    switch (mode) {
      case 'startsWith':
        return v.startsWith(q);
      case 'endsWith':
        return v.endsWith(q);
      case 'equals':
        return v === q;
      case 'notEquals':
        return v !== q;
      case 'contains':
      default:
        return v.includes(q);
    }
  }

  public getFlatFilteredOptions(): any[] {
    if (this.group()) {
      const flat: any[] = [];
      for (const grp of this.filteredOptions()) {
        flat.push(...this.resolveOptionGroupChildren(grp));
      }
      return flat;
    }
    return this.filteredOptions();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.overlayVisible()) {
          this.openOverlay(event);
        } else {
          this.navigateOption(1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.overlayVisible()) {
          this.openOverlay(event);
        } else {
          this.navigateOption(-1);
        }
        break;

      case 'Enter':
      case ' ':
        if (
          event.key === ' ' &&
          ((this.filter() && this.filterInputElement?.nativeElement === document.activeElement) ||
            (this.filterInTrigger() &&
              this.triggerFilterInputElement?.nativeElement === document.activeElement))
        ) {
          return;
        }
        event.preventDefault();
        if (!this.overlayVisible()) {
          this.openOverlay(event);
        } else {
          const flatItems = this.getFlatFilteredOptions();
          if (this.focusedIndex() >= 0 && this.focusedIndex() < flatItems.length) {
            this.onOptionClick(flatItems[this.focusedIndex()], event);
          }
        }
        break;

      case 'Escape':
        if (this.overlayVisible()) {
          event.preventDefault();
          this.closeOverlay(event);
        }
        break;

      case 'Tab':
        if (this.overlayVisible()) {
          this.closeOverlay(event);
        }
        break;
    }
  }

  onFilterKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === 'Escape'
    ) {
      this.onKeydown(event);
    }
  }

  private navigateOption(step: number): void {
    const flatItems = this.getFlatFilteredOptions();
    if (flatItems.length === 0) return;

    let nextIdx = this.focusedIndex() + step;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= flatItems.length) nextIdx = flatItems.length - 1;

    while (
      nextIdx >= 0 &&
      nextIdx < flatItems.length &&
      this.isOptionDisabled(flatItems[nextIdx])
    ) {
      nextIdx += step;
    }

    if (nextIdx >= 0 && nextIdx < flatItems.length) {
      this.focusedIndex.set(nextIdx);
      if (this.dropdownMenuElement) {
        const elements = this.dropdownMenuElement.nativeElement.querySelectorAll(
          '.dropdown-item[role="option"]',
        );
        const targetElement = elements[nextIdx] as HTMLElement;
        if (targetElement && typeof targetElement.scrollIntoView === 'function') {
          targetElement.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
      }
    }
  }

  isOptionFocused(option: any): boolean {
    if (this.focusedIndex() < 0) return false;
    const flat = this.getFlatFilteredOptions();
    if (this.focusedIndex() >= flat.length) return false;
    return this.areValuesEqual(
      this.resolveOptionValue(flat[this.focusedIndex()]),
      this.resolveOptionValue(option),
    );
  }

  onOverlayScroll(event: Event): void {
    if (!this.lazy()) return;
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      const flat = this.getFlatFilteredOptions();
      this.onLazyLoad.emit({
        first: flat.length,
        last: flat.length + 10,
      });
    }
  }

  private handleAppendTo(): void {
    const appendTo = this.appendTo();
    if (!appendTo || !this.dropdownMenuElement) return;
    if (appendTo === 'body') {
      document.body.appendChild(this.dropdownMenuElement.nativeElement);
      this.repositionOverlay();
    } else if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(this.dropdownMenuElement.nativeElement);
      this.repositionOverlay();
    }
  }

  private repositionOverlay(): void {
    if (!this.dropdownMenuElement) return;
    const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();
    const dropdown = this.dropdownMenuElement.nativeElement;
    dropdown.style.position = 'fixed';
    dropdown.style.top = `${triggerRect.bottom + 2}px`;
    dropdown.style.left = `${triggerRect.left}px`;
    dropdown.style.width = `${triggerRect.width}px`;
    dropdown.style.minWidth = `${triggerRect.width}px`;
    dropdown.style.maxWidth = `${triggerRect.width}px`;
    dropdown.style.boxSizing = 'border-box';
    dropdown.style.zIndex = '1060';
  }

  private cleanAppendTo(): void {
    if (this.appendTo() && this.dropdownMenuElement) {
      const el = this.dropdownMenuElement.nativeElement;
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }
  }

  onTriggerFocus(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  onTriggerBlur(event: FocusEvent): void {
    this.onBlur.emit(event);
  }

  public focus(): void {
    if (this.filterInTrigger() && this.triggerFilterInputElement) {
      this.triggerFilterInputElement.nativeElement.focus();
    } else if (this.editable() && !this.multiple() && this.editableInputElement) {
      this.editableInputElement.nativeElement.focus();
    } else {
      const trigger = this.elementRef.nativeElement.querySelector('.form-select');
      if (trigger) trigger.focus();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.overlayVisible() && this.appendTo()) {
      this.repositionOverlay();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.overlayVisible() && this.appendTo()) {
      this.repositionOverlay();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.overlayVisible() && !this.elementRef.nativeElement.contains(event.target)) {
      if (
        this.dropdownMenuElement &&
        this.dropdownMenuElement.nativeElement.contains(event.target as Node)
      ) {
        return;
      }
      this.closeOverlay(event);
    }
  }
}
