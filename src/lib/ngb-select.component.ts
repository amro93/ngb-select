import {
  Component,
  forwardRef,
  ElementRef,
  ViewChild,
  ContentChild,
  TemplateRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone,
  input,
  output,
  model,
  signal,
  computed,
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
  DropdownPosition,
  DropdownDirection,
  NGB_SELECT_VERSION,
} from './ngb-select.interface';

@Component({
  selector: 'ngb-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ngb-select.component.html',
  styleUrls: ['./ngb-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  dropdownPosition = input<DropdownPosition>('auto');
  dropdownDirection = input<DropdownDirection | undefined>(undefined);
  direction = input<DropdownDirection | undefined>(undefined);
  size = input<SelectSize | undefined>(undefined);
  variant = input<SelectVariant>('outlined');
  fluid = input<boolean>(false);
  scrollHeight = input<string>('200px');
  style = input<{ [klass: string]: any } | null | undefined>(undefined);
  styleClass = input<string | undefined>(undefined);
  panelStyle = input<{ [klass: string]: any } | null | undefined>(undefined);
  panelStyleClass = input<string | undefined>(undefined);
  appendTo = input<'body' | HTMLElement | string | undefined>(undefined);

  // --- Modal / Popup Window Inputs ---
  modal = input<boolean>(false);
  popup = input<boolean>(false);
  touchUI = input<boolean>(false);
  popupTitle = input<string | undefined>(undefined);
  modalTitle = input<string | undefined>(undefined);

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

  // --- Computed UI & Accessibility State ---
  effectiveSearchPlaceholder = computed(() => {
    return (
      this.searchPlaceholder() || this.filterPlaceholder() || this.placeholder() || 'Search...'
    );
  });

  effectiveDropdownPosition = computed<DropdownPosition>(() => {
    return this.dropdownDirection() || this.direction() || this.dropdownPosition() || 'auto';
  });

  currentPlacement = signal<'bottom' | 'top'>('bottom');
  isDropup = computed(() => this.currentPlacement() === 'top');

  isModalMode = computed(() => this.modal() || this.popup() || this.touchUI());
  effectivePopupTitle = computed(() => {
    return this.popupTitle() || this.modalTitle() || this.placeholder() || 'Select an Option';
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
  public filterValue = signal<string>('');
  public focusedIndex = signal<number>(-1);

  // --- Reactive Option Filtering & Transformation ---
  safeOptions = computed<any[]>(() => {
    const opts = this.options();
    return Array.isArray(opts) ? opts : [];
  });

  filterFields = computed<string[]>(() => {
    const filterBy = this.filterBy();
    if (filterBy) {
      return filterBy.split(',').map((f) => f.trim());
    }
    return [this.optionLabel() || 'label'];
  });

  filteredOptions = computed<any[]>(() => {
    const opts = this.safeOptions();
    const query = this.filterValue();
    if (!query) {
      return opts;
    }

    const mode = this.filterMatchMode();
    const locale = this.filterLocale();
    const normalizeArabic = this.filterNormalizeArabic();
    const fields = this.filterFields();
    const isGroup = this.group();
    const groupChildrenKey = this.optionGroupChildren();

    if (isGroup) {
      return opts
        .map((group) => {
          const children = this.resolveOptionGroupChildren(group);
          const filteredChildren = children.filter((opt) =>
            this.matchesFilter(opt, query, fields, mode, locale, normalizeArabic),
          );
          return {
            ...group,
            [groupChildrenKey]: filteredChildren,
          };
        })
        .filter((group) => this.resolveOptionGroupChildren(group).length > 0);
    } else {
      return opts.filter((opt) =>
        this.matchesFilter(opt, query, fields, mode, locale, normalizeArabic),
      );
    }
  });

  flatFilteredOptions = computed<any[]>(() => {
    const filtered = this.filteredOptions();
    if (this.group()) {
      const flat: any[] = [];
      for (const grp of filtered) {
        flat.push(...this.resolveOptionGroupChildren(grp));
      }
      return flat;
    }
    return filtered;
  });

  isOptionsEmpty = computed<boolean>(() => {
    const filtered = this.filteredOptions();
    if (filtered.length === 0) return true;
    if (this.group()) {
      return filtered.every((grp) => this.resolveOptionGroupChildren(grp).length === 0);
    }
    return false;
  });

  // Flat list of all available options for fast lookup
  flatOptions = computed<any[]>(() => {
    const opts = this.safeOptions();
    if (this.group()) {
      const flat: any[] = [];
      for (const grp of opts) {
        flat.push(...this.resolveOptionGroupChildren(grp));
      }
      return flat;
    }
    return opts;
  });

  // Fast O(1) Map for option resolution by value or dataKey
  valueToOptionMap = computed<Map<any, any>>(() => {
    const map = new Map<any, any>();
    const all = this.flatOptions();
    for (const opt of all) {
      const val = this.resolveOptionValue(opt);
      if (val !== null && val !== undefined) {
        map.set(val, opt);
      }
      if (opt !== null && opt !== undefined && typeof opt === 'object') {
        map.set(opt, opt);
      }
      if (typeof val === 'object') {
        const key = this.getLookupKey(val);
        if (key !== undefined) {
          map.set(key, opt);
        }
      }
      if (opt && typeof opt === 'object') {
        const key = this.getLookupKey(opt);
        if (key !== undefined) {
          map.set(key, opt);
        }
      }
    }
    return map;
  });

  // Fast O(1) Set for multi-select membership checking
  selectedValuesSet = computed<Set<any>>(() => {
    const val = this.value();
    const set = new Set<any>();
    if (this.multiple() && Array.isArray(val)) {
      for (const item of val) {
        set.add(item);
        if (item && typeof item === 'object') {
          const key = this.getLookupKey(item);
          if (key !== undefined) {
            set.add(key);
          }
        }
      }
    }
    return set;
  });

  hasSelectedValue = computed<boolean>(() => {
    const val = this.value();
    if (this.multiple()) {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== null && val !== undefined && val !== '';
  });

  displayLabel = computed<string>(() => {
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
  });

  selectAll = computed<boolean | null>(() => {
    if (!this.multiple() || !this.showSelectAll()) return null;
    const targetOptions = this.flatFilteredOptions().filter((opt) => !this.isOptionDisabled(opt));
    if (targetOptions.length === 0) return false;
    return targetOptions.every((opt) => this.isSelected(opt));
  });

  focusedOption = computed<any>(() => {
    const idx = this.focusedIndex();
    if (idx < 0) return undefined;
    const flat = this.flatFilteredOptions();
    if (idx >= flat.length) return undefined;
    return flat[idx];
  });

  // --- ControlValueAccessor Callbacks ---
  private onModelChange: (value: any) => void = () => {};
  private onModelTouched: () => void = () => {};

  private unlistenWindow?: () => void;
  private unlistenDocumentClick?: () => void;

  constructor(
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    if (this.autofocus()) {
      setTimeout(() => this.focus());
    }

    // Attach high-frequency window scroll & resize events outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      const handleWindowReposition = () => {
        if (this.overlayVisible()) {
          this.calculateDropdownPosition();
          if (this.appendTo()) {
            this.repositionOverlay();
          }
        }
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleWindowReposition, { passive: true });
        window.addEventListener('scroll', handleWindowReposition, { passive: true, capture: true });

        this.unlistenWindow = () => {
          window.removeEventListener('resize', handleWindowReposition);
          window.removeEventListener('scroll', handleWindowReposition, { capture: true } as any);
        };
      }
    });
  }

  ngOnDestroy(): void {
    if (this.unlistenWindow) {
      this.unlistenWindow();
    }
    this.unbindDocumentClickListener();
    this.cleanAppendTo();
  }

  writeValue(obj: any): void {
    if (this.multiple()) {
      this.value.set(Array.isArray(obj) ? [...obj] : []);
    } else {
      this.value.set(obj !== undefined ? obj : null);
    }
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

  getDisplayLabel(): string {
    return this.displayLabel();
  }

  resolveOptionTrackKey(option: any, index: number): any {
    if (option === null || option === undefined) return index;
    const val = this.resolveOptionValue(option);
    if (val !== null && val !== undefined && (typeof val === 'string' || typeof val === 'number')) {
      return val;
    }
    const dataKey = this.dataKey();
    if (dataKey && typeof option === 'object' && option[dataKey] !== undefined) {
      return option[dataKey];
    }
    return option;
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
      const labelKey = this.optionLabel();
      if (labelKey && option[labelKey] !== undefined) {
        return String(option[labelKey]);
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
      const valKey = this.optionValue();
      if (valKey && option[valKey] !== undefined) {
        return option[valKey];
      }
      if (option.value !== undefined) {
        return option.value;
      }
    }
    return option;
  }

  private getLookupKey(val: any): any {
    if (!val || typeof val !== 'object') return val;
    const dataKey = this.dataKey();
    if (dataKey && val[dataKey] !== undefined) {
      return `dk:${val[dataKey]}`;
    }
    const valKey = this.optionValue();
    if (valKey && val[valKey] !== undefined) {
      return `ov:${val[valKey]}`;
    }
    return undefined;
  }

  isOptionDisabled(option: any): boolean {
    if (this.disabled()) return true;
    if (option && typeof option === 'object') {
      const disabledKey = this.optionDisabled();
      if (disabledKey && option[disabledKey] !== undefined) {
        return Boolean(option[disabledKey]);
      }
      return Boolean(option.disabled);
    }
    return false;
  }

  resolveOptionGroupLabel(groupOption: any): string {
    if (!groupOption) return '';
    const groupLabelKey = this.optionGroupLabel();
    if (groupLabelKey && groupOption[groupLabelKey] !== undefined) {
      return String(groupOption[groupLabelKey]);
    }
    return String(groupOption.label || '');
  }

  resolveOptionGroupChildren(groupOption: any): any[] {
    if (!groupOption) return [];
    const groupChildrenKey = this.optionGroupChildren();
    if (groupChildrenKey && Array.isArray(groupOption[groupChildrenKey])) {
      return groupOption[groupChildrenKey];
    }
    return Array.isArray(groupOption.items) ? groupOption.items : [];
  }

  findOptionByValue(val: any): any {
    if (val === null || val === undefined) return undefined;

    // Fast O(1) lookup from computed map
    const map = this.valueToOptionMap();
    if (map.has(val)) {
      return map.get(val);
    }
    const lookupKey = this.getLookupKey(val);
    if (lookupKey !== undefined && map.has(lookupKey)) {
      return map.get(lookupKey);
    }

    // Fallback scan
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
      const optVal = this.optionValue();
      if (optVal && val1[optVal] !== undefined && val2[optVal] !== undefined) {
        return val1[optVal] === val2[optVal];
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
    if (this.multiple()) {
      const set = this.selectedValuesSet();
      if (set.has(optVal)) return true;
      const lookupKey = this.getLookupKey(optVal);
      if (lookupKey !== undefined && set.has(lookupKey)) return true;

      const valArr = Array.isArray(this.value()) ? this.value() : [];
      return valArr.some((item: any) => this.areValuesEqual(item, optVal));
    }
    return this.areValuesEqual(this.value(), optVal);
  }

  updateFilteredOptions(): void {
    // Kept for backward compatibility if called manually
    this.cdr.markForCheck();
  }

  updateSelectAllState(): void {
    // Select all is now a computed signal
    this.cdr.markForCheck();
  }

  onTriggerClick(event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;
    this.toggleOverlay(event);
  }

  calculateDropdownPosition(): void {
    const pref = this.effectiveDropdownPosition();
    if (pref === 'top' || pref === 'up') {
      this.currentPlacement.set('top');
      return;
    }
    if (pref === 'bottom' || pref === 'down') {
      this.currentPlacement.set('bottom');
      return;
    }

    // Auto positioning based on viewport space
    if (typeof window === 'undefined' || !this.elementRef?.nativeElement) {
      this.currentPlacement.set('bottom');
      return;
    }

    const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    let panelHeight = 200;
    if (this.dropdownMenuElement?.nativeElement?.offsetHeight) {
      panelHeight = this.dropdownMenuElement.nativeElement.offsetHeight;
    } else if (this.scrollHeight()) {
      const parsed = parseInt(this.scrollHeight(), 10);
      if (!isNaN(parsed) && parsed > 0) {
        panelHeight = parsed;
      }
    }

    if (spaceBelow < panelHeight && spaceAbove > spaceBelow) {
      this.currentPlacement.set('top');
    } else {
      this.currentPlacement.set('bottom');
    }
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

    this.calculateDropdownPosition();
    this.overlayVisible.set(true);
    this.onShow.emit(event || null);
    this.onModelTouched();

    this.bindDocumentClickListener();

    setTimeout(() => {
      this.calculateDropdownPosition();
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

    this.unbindDocumentClickListener();

    this.overlayVisible.set(false);
    this.onHide.emit(event || null);

    if (this.resetFilterOnHide() && this.filterValue()) {
      this.filterValue.set('');
    }
    this.focusedIndex.set(-1);
    this.cdr.markForCheck();
  }

  private bindDocumentClickListener(): void {
    if (typeof document === 'undefined' || this.unlistenDocumentClick) return;
    const clickHandler = (event: MouseEvent) => {
      if (
        !this.elementRef.nativeElement.contains(event.target) &&
        (!this.dropdownMenuElement ||
          !this.dropdownMenuElement.nativeElement.contains(event.target as Node))
      ) {
        this.ngZone.run(() => {
          this.closeOverlay(event);
        });
      }
    };
    document.addEventListener('click', clickHandler, { capture: true });
    this.unlistenDocumentClick = () => {
      document.removeEventListener('click', clickHandler, { capture: true });
      this.unlistenDocumentClick = undefined;
    };
  }

  private unbindDocumentClickListener(): void {
    if (this.unlistenDocumentClick) {
      this.unlistenDocumentClick();
    }
  }

  private handleFocusOnOpen(): void {
    const flatItems = this.flatFilteredOptions();
    let targetIndex = -1;

    const hasSelection = this.hasSelectedValue();
    const selectedIdx = flatItems.findIndex((opt) => this.isSelected(opt));

    const focusOnOpen = this.focusOnOpen();
    if (focusOnOpen !== undefined && focusOnOpen >= 0 && focusOnOpen < flatItems.length) {
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
        if (
          this.selectionLimit() !== undefined &&
          currentSelection.length >= this.selectionLimit()!
        ) {
          return;
        }
        currentSelection.push(val);
      }

      this.updateModel(currentSelection, event);

      if (this.closeOnSelect()) {
        this.closeOverlay(event);
      }
    } else {
      this.updateModel(val, event);
      if (this.filterInTrigger()) {
        this.filterValue.set('');
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
    }
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const targetOptions = this.flatFilteredOptions().filter((opt) => !this.isOptionDisabled(opt));

    if (checked) {
      let allValues = targetOptions.map((opt) => this.resolveOptionValue(opt));
      if (this.selectionLimit() !== undefined) {
        allValues = allValues.slice(0, this.selectionLimit());
      }
      this.value.set(allValues);
    } else {
      this.value.set([]);
    }

    this.updateModel(this.value(), event);
    this.onSelectAllChange.emit({ originalEvent: event, checked });
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
    this.onFilter.emit({
      originalEvent: event,
      filter: this.filterValue(),
    });
  }

  private matchesFilter(
    option: any,
    query: string,
    fieldsToSearch: string[],
    matchMode: SelectFilterMatchMode,
    locale?: string,
    normalizeArabic = true,
  ): boolean {
    if (!option) return false;

    return fieldsToSearch.some((field) => {
      const val = this.resolveFieldData(option, field);
      if (val === null || val === undefined) return false;

      const stringVal = String(val);
      return this.compareStrings(stringVal, query, matchMode, locale, normalizeArabic);
    });
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
    normalizeArabic = true,
  ): boolean {
    let v = locale ? val.toLocaleLowerCase(locale) : val.toLowerCase();
    let q = locale ? query.toLocaleLowerCase(locale) : query.toLowerCase();

    if (normalizeArabic) {
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
    return this.flatFilteredOptions();
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
          const flatItems = this.flatFilteredOptions();
          const focusedIdx = this.focusedIndex();
          if (focusedIdx >= 0 && focusedIdx < flatItems.length) {
            this.onOptionClick(flatItems[focusedIdx], event);
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
    const flatItems = this.flatFilteredOptions();
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
    const focused = this.focusedOption();
    if (focused === undefined || option === undefined) return false;
    if (focused === option) return true;
    return this.areValuesEqual(this.resolveOptionValue(focused), this.resolveOptionValue(option));
  }

  onOverlayScroll(event: Event): void {
    if (!this.lazy()) return;
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      const flat = this.flatFilteredOptions();
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
    if (!this.dropdownMenuElement || this.isModalMode()) return;
    this.calculateDropdownPosition();
    const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();
    const dropdown = this.dropdownMenuElement.nativeElement;
    dropdown.style.position = 'fixed';
    dropdown.style.left = `${triggerRect.left}px`;
    dropdown.style.width = `${triggerRect.width}px`;
    dropdown.style.minWidth = `${triggerRect.width}px`;
    dropdown.style.maxWidth = `${triggerRect.width}px`;
    dropdown.style.boxSizing = 'border-box';
    dropdown.style.zIndex = '1060';

    if (this.isDropup()) {
      dropdown.style.top = 'auto';
      dropdown.style.bottom = `${window.innerHeight - triggerRect.top + 2}px`;
    } else {
      dropdown.style.top = `${triggerRect.bottom + 2}px`;
      dropdown.style.bottom = 'auto';
    }
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
}
