import {
  Component,
  forwardRef,
  ElementRef,
  TemplateRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  booleanAttribute,
  input,
  output,
  model,
  signal,
  computed,
  viewChild,
  contentChild,
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
  TreeSelectableMode,
  TreeNodeEntry,
  NGB_SELECT_VERSION,
} from './ngb-select.interface';

const OPTION_ROW_SELECTOR = '.dropdown-item[role="option"], .dropdown-item[role="treeitem"]';

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
export class NgbSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  public static readonly VERSION = NGB_SELECT_VERSION;

  // --- Dependency Injection ---
  public elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

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
  filter = input<boolean, unknown>(false, { transform: booleanAttribute });
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
  showClear = input<boolean, unknown>(false, { transform: booleanAttribute });
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
  fluid = input<boolean>(true);
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

  // --- Tree Mode Inputs ---
  tree = input<boolean, unknown>(false, { transform: booleanAttribute });
  optionChildren = input<string>('children');
  treeSelectable = input<TreeSelectableMode>('all');
  treeExpandAll = input<boolean, unknown>(false, { transform: booleanAttribute });
  treeShowPath = input<boolean, unknown>(false, { transform: booleanAttribute });

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
  onNodeExpand = output<any>();
  onNodeCollapse = output<any>();

  // --- Custom Content Templates ---
  itemTemplate = contentChild<TemplateRef<any>>('item');
  selectedItemTemplate = contentChild<TemplateRef<any>>('selectedItem');
  labelTemplate = contentChild<TemplateRef<any>>('label');
  chipTemplate = contentChild<TemplateRef<any>>('chip');
  headerCheckboxTemplate = contentChild<TemplateRef<any>>('headerCheckbox');
  headerTemplate = contentChild<TemplateRef<any>>('header');
  footerTemplate = contentChild<TemplateRef<any>>('footer');
  groupTemplate = contentChild<TemplateRef<any>>('group');
  emptyTemplate = contentChild<TemplateRef<any>>('empty');
  clearIconTemplate = contentChild<TemplateRef<any>>('clearIcon');
  dropdownIconTemplate = contentChild<TemplateRef<any>>('dropdownIcon');
  filterIconTemplate = contentChild<TemplateRef<any>>('filterIcon');

  // --- View References ---
  filterInputElement = viewChild<ElementRef<HTMLInputElement>>('filterInput');
  triggerFilterInputElement = viewChild<ElementRef<HTMLInputElement>>('triggerFilterInput');
  editableInputElement = viewChild<ElementRef<HTMLInputElement>>('editableInput');
  dropdownMenuElement = viewChild<ElementRef<HTMLDivElement>>('dropdownMenu');

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

  // --- Tree Mode State ---
  /** User expansion state (null = not touched yet; falls back to treeExpandAll). */
  private treeExpandedKeys = signal<Set<any> | null>(null);
  /** Keys toggled by the user while a filter is active (XOR with auto-expanded ancestors). */
  private treeFilterToggleState = signal<{ query: string; keys: Set<any> }>({
    query: '',
    keys: new Set(),
  });
  /** Toggles only apply to the filter query they were made under. */
  private treeFilterToggles = computed<Set<any>>(() => {
    const state = this.treeFilterToggleState();
    return state.query === this.filterValue() ? state.keys : new Set();
  });

  /** Parent lookup and full flat list of every node in the tree. */
  treeIndex = computed(() => {
    const parents = new Map<any, any>();
    const depths = new Map<any, number>();
    const all: any[] = [];
    const parentKeys: any[] = [];
    if (!this.tree()) return { parents, depths, all, parentKeys };
    const walk = (nodes: any[], parent: any, depth: number) => {
      for (const node of nodes) {
        parents.set(node, parent);
        depths.set(node, depth);
        all.push(node);
        const children = this.resolveTreeChildren(node);
        if (children.length) {
          parentKeys.push(this.treeNodeKey(node));
          walk(children, node, depth + 1);
        }
      }
    };
    walk(this.safeOptions(), null, 0);
    return { parents, depths, all, parentKeys };
  });

  private effectiveTreeExpanded = computed<Set<any>>(() => {
    const keys = this.treeExpandedKeys();
    if (keys) return keys;
    return this.treeExpandAll() ? new Set(this.treeIndex().parentKeys) : new Set();
  });

  /** Filter result in tree mode: nodes to include and ancestors to auto-expand. */
  private treeFilterResult = computed<{ include: Set<any>; autoExpand: Set<any> } | null>(() => {
    if (!this.tree()) return null;
    const query = this.filterValue();
    if (!query) return null;
    const mode = this.filterMatchMode();
    const locale = this.filterLocale();
    const normalizeArabic = this.filterNormalizeArabic();
    const fields = this.filterFields();
    const include = new Set<any>();
    const autoExpand = new Set<any>();
    const visit = (node: any, underMatch: boolean): boolean => {
      const self = this.matchesFilter(node, query, fields, mode, locale, normalizeArabic);
      let descendantHit = false;
      for (const child of this.resolveTreeChildren(node)) {
        if (visit(child, underMatch || self)) descendantHit = true;
      }
      if (descendantHit) autoExpand.add(this.treeNodeKey(node));
      const hit = self || descendantHit;
      if (hit || underMatch) include.add(node);
      return hit;
    };
    for (const root of this.safeOptions()) visit(root, false);
    return { include, autoExpand };
  });

  /** Flattened list of currently visible tree rows. */
  visibleTreeNodes = computed<TreeNodeEntry[]>(() => {
    if (!this.tree()) return [];
    const filterRes = this.treeFilterResult();
    const expanded = this.effectiveTreeExpanded();
    const toggles = this.treeFilterToggles();
    const rows: TreeNodeEntry[] = [];
    const walk = (nodes: any[], parent: any, depth: number) => {
      for (const node of nodes) {
        if (filterRes && !filterRes.include.has(node)) continue;
        const key = this.treeNodeKey(node);
        const children = this.resolveTreeChildren(node);
        const hasChildren = children.length > 0;
        const isExpanded =
          hasChildren &&
          (filterRes ? filterRes.autoExpand.has(key) !== toggles.has(key) : expanded.has(key));
        rows.push({ node, key, depth, hasChildren, expanded: isExpanded, parent });
        if (isExpanded) walk(children, node, depth + 1);
      }
    };
    walk(this.safeOptions(), null, 0);
    return rows;
  });

  filteredOptions = computed<any[]>(() => {
    if (this.tree()) {
      return this.visibleTreeNodes().map((r) => r.node);
    }
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
    if (this.group() && !this.tree()) {
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
    if (this.group() && !this.tree()) {
      return filtered.every((grp) => this.resolveOptionGroupChildren(grp).length === 0);
    }
    return false;
  });

  // Flat list of all available options for fast lookup
  flatOptions = computed<any[]>(() => {
    if (this.tree()) {
      return this.treeIndex().all;
    }
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

  ngOnInit(): void {
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
  }

  ngAfterViewInit(): void {
    if (this.autofocus()) {
      this.focus();
    }
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
      if (this.tree() && this.treeShowPath()) {
        return this.getTreePath(selectedOpt)
          .map((n) => this.resolveOptionLabel(n))
          .join(' › ');
      }
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
    if (this.tree()) {
      return this.flatOptions().find((opt) =>
        this.areValuesEqual(this.resolveOptionValue(opt), val),
      );
    }
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
    const dropdownMenuEl = this.dropdownMenuElement();
    if (dropdownMenuEl?.nativeElement?.offsetHeight) {
      panelHeight = dropdownMenuEl.nativeElement.offsetHeight;
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

    if (this.tree()) {
      this.expandToSelection();
      try {
        this.cdr.detectChanges();
      } catch {
        // ignore: view may not be ready
      }
    }

    const triggerFilterInputEl = this.triggerFilterInputElement();
    const filterInputEl = this.filterInputElement();
    if (this.filterInTrigger() && triggerFilterInputEl) {
      triggerFilterInputEl.nativeElement.focus();
    } else if (this.filter() && filterInputEl) {
      filterInputEl.nativeElement.focus();
    }
    this.handleFocusOnOpen();
    this.handleAppendTo();
    this.cdr.markForCheck();
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
      const dropdownMenuEl = this.dropdownMenuElement();
      if (
        !this.elementRef.nativeElement.contains(event.target) &&
        (!dropdownMenuEl ||
          !dropdownMenuEl.nativeElement.contains(event.target as Node))
      ) {
        this.closeOverlay(event);
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

    const dropdownMenuEl = this.dropdownMenuElement();
    if (targetIndex !== -1 && dropdownMenuEl) {
      this.focusedIndex.set(targetIndex);
      const elements = dropdownMenuEl.nativeElement.querySelectorAll(
        OPTION_ROW_SELECTOR,
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
        const triggerFilterInputEl = this.triggerFilterInputElement();
        if (triggerFilterInputEl) {
          triggerFilterInputEl.nativeElement.value = '';
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
    const editableInputEl = this.editableInputElement();
    if (this.selectOnFocus() && editableInputEl) {
      editableInputEl.nativeElement.select();
    }
    this.onFocus.emit(event);
  }

  onFilterChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value || '';
    this.filterValue.set(raw);
    if (this.tree()) {
      this.focusedIndex.set(-1);
    }
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
          ((this.filter() && this.filterInputElement()?.nativeElement === document.activeElement) ||
            (this.filterInTrigger() &&
              this.triggerFilterInputElement()?.nativeElement === document.activeElement))
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
            if (this.tree()) {
              const entry = this.visibleTreeNodes()[focusedIdx];
              if (entry) this.activateTreeEntry(entry, event);
            } else {
              this.onOptionClick(flatItems[focusedIdx], event);
            }
          }
        }
        break;

      case 'ArrowRight':
      case 'ArrowLeft':
      case 'Home':
      case 'End':
        if (this.tree() && this.overlayVisible() && !this.isTextInputTarget(event)) {
          event.preventDefault();
          this.handleTreeKey(event);
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
      const dropdownMenuEl = this.dropdownMenuElement();
      if (dropdownMenuEl) {
        const elements = dropdownMenuEl.nativeElement.querySelectorAll(
          OPTION_ROW_SELECTOR,
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
    const dropdownMenuEl = this.dropdownMenuElement();
    if (!appendTo || !dropdownMenuEl) return;
    if (appendTo === 'body') {
      document.body.appendChild(dropdownMenuEl.nativeElement);
      this.repositionOverlay();
    } else if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(dropdownMenuEl.nativeElement);
      this.repositionOverlay();
    }
  }

  private repositionOverlay(): void {
    const dropdownMenuEl = this.dropdownMenuElement();
    if (!dropdownMenuEl || this.isModalMode()) return;
    this.calculateDropdownPosition();
    const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();
    const dropdown = dropdownMenuEl.nativeElement;
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
    const dropdownMenuEl = this.dropdownMenuElement();
    if (this.appendTo() && dropdownMenuEl) {
      const el = dropdownMenuEl.nativeElement;
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
    const triggerFilterInputEl = this.triggerFilterInputElement();
    const editableInputEl = this.editableInputElement();
    if (this.filterInTrigger() && triggerFilterInputEl) {
      triggerFilterInputEl.nativeElement.focus();
    } else if (this.editable() && !this.multiple() && editableInputEl) {
      editableInputEl.nativeElement.focus();
    } else {
      const trigger = this.elementRef.nativeElement.querySelector('.form-select');
      if (trigger) trigger.focus();
    }
  }

  // ==========================================
  // Tree Mode
  // ==========================================

  resolveTreeChildren(node: any): any[] {
    if (!node || typeof node !== 'object') return [];
    const key = this.optionChildren() || 'children';
    return Array.isArray(node[key]) ? node[key] : [];
  }

  treeNodeKey(node: any): any {
    return this.resolveOptionTrackKey(node, -1);
  }

  /** Ancestors (root first) followed by the node itself. */
  getTreePath(node: any): any[] {
    const parents = this.treeIndex().parents;
    const path: any[] = [];
    let current = node;
    let guard = 0;
    while (current !== null && current !== undefined && guard++ < 1000) {
      path.unshift(current);
      current = parents.get(current) ?? null;
    }
    return path;
  }

  isTreeNodeExpanded(node: any): boolean {
    const key = this.treeNodeKey(node);
    const filterRes = this.treeFilterResult();
    if (filterRes) {
      return filterRes.autoExpand.has(key) !== this.treeFilterToggles().has(key);
    }
    return this.effectiveTreeExpanded().has(key);
  }

  isRtl(): boolean {
    const dir = this.dir();
    if (dir === 'rtl') return true;
    if (dir === 'ltr') return false;
    const el: HTMLElement | undefined = this.elementRef?.nativeElement;
    if (el && typeof el.closest === 'function') {
      const host = el.closest('[dir]');
      return !!host && host.getAttribute('dir') === 'rtl';
    }
    return false;
  }

  treeIndent(depth: number): string {
    return `calc(0.75rem + ${depth} * 1.25rem)`;
  }

  /** Template context for the option/item template in tree mode. */
  treeItemContext(entry: TreeNodeEntry): any {
    return {
      $implicit: entry.node,
      node: entry.node,
      depth: entry.depth,
      expanded: entry.expanded,
      hasChildren: entry.hasChildren,
    };
  }

  /** Template context for the selected item/label template. */
  selectedItemContext(val: any): any {
    const option = this.findOptionByValue(val);
    const ctx: any = { $implicit: option ?? val, value: val };
    if (this.tree() && option !== undefined) {
      const path = this.getTreePath(option);
      ctx.node = option;
      ctx.depth = path.length - 1;
      ctx.path = path;
      ctx.hasChildren = this.resolveTreeChildren(option).length > 0;
    }
    return ctx;
  }

  isTreeNodeSelectable(entry: TreeNodeEntry): boolean {
    return !(this.treeSelectable() === 'leaf' && entry.hasChildren);
  }

  setTreeNodeExpanded(node: any, expand: boolean, event: Event | null = null): void {
    const key = this.treeNodeKey(node);
    if (this.resolveTreeChildren(node).length === 0) return;
    if (this.isTreeNodeExpanded(node) === expand) return;

    if (this.treeFilterResult()) {
      const toggles = new Set(this.treeFilterToggles());
      if (toggles.has(key)) toggles.delete(key);
      else toggles.add(key);
      this.treeFilterToggleState.set({ query: this.filterValue(), keys: toggles });
    } else {
      const next = new Set(this.effectiveTreeExpanded());
      if (expand) next.add(key);
      else next.delete(key);
      this.treeExpandedKeys.set(next);
    }

    if (expand) this.onNodeExpand.emit(node);
    else this.onNodeCollapse.emit(node);
    void event;
    this.cdr.markForCheck();
  }

  toggleTreeNode(node: any, event: Event | null = null): void {
    this.setTreeNodeExpanded(node, !this.isTreeNodeExpanded(node), event);
  }

  onTreeToggleClick(entry: TreeNodeEntry, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.focusedIndex.set(this.visibleTreeNodes().indexOf(entry));
    this.toggleTreeNode(entry.node, event);
  }

  onTreeRowClick(entry: TreeNodeEntry, event: Event): void {
    this.focusedIndex.set(this.visibleTreeNodes().indexOf(entry));
    this.activateTreeEntry(entry, event);
  }

  private activateTreeEntry(entry: TreeNodeEntry, event: Event): void {
    if (this.isOptionDisabled(entry.node)) return;
    if (!this.isTreeNodeSelectable(entry)) {
      this.toggleTreeNode(entry.node, event);
      return;
    }
    this.onOptionClick(entry.node, event);
  }

  /** Expands the ancestors of the selected value(s) so they are visible. */
  private expandToSelection(): void {
    if (this.treeFilterResult()) return;
    const val = this.value();
    const values = this.multiple() ? (Array.isArray(val) ? val : []) : [val];
    const parents = this.treeIndex().parents;
    const next = new Set(this.effectiveTreeExpanded());
    let changed = false;
    for (const v of values) {
      if (v === null || v === undefined || v === '') continue;
      const opt = this.findOptionByValue(v);
      if (opt === undefined) continue;
      let p = parents.get(opt);
      while (p) {
        const key = this.treeNodeKey(p);
        if (!next.has(key)) {
          next.add(key);
          changed = true;
        }
        p = parents.get(p);
      }
    }
    if (changed || this.treeExpandedKeys() === null) {
      this.treeExpandedKeys.set(next);
    }
  }

  private isTextInputTarget(event: Event): boolean {
    const t = event.target as HTMLElement | null;
    return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA');
  }

  private focusTreeIndex(idx: number): void {
    const rows = this.visibleTreeNodes();
    if (idx < 0 || idx >= rows.length) return;
    this.focusedIndex.set(idx);
    const menu = this.dropdownMenuElement();
    if (menu) {
      const el = menu.nativeElement.querySelectorAll(OPTION_ROW_SELECTOR)[idx] as HTMLElement;
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    }
  }

  private handleTreeKey(event: KeyboardEvent): void {
    const rows = this.visibleTreeNodes();
    if (rows.length === 0) return;
    const idx = this.focusedIndex();

    if (event.key === 'Home' || event.key === 'End') {
      const step = event.key === 'Home' ? 1 : -1;
      let i = event.key === 'Home' ? 0 : rows.length - 1;
      while (i >= 0 && i < rows.length && this.isOptionDisabled(rows[i].node)) i += step;
      this.focusTreeIndex(i);
      return;
    }

    const entry = rows[idx];
    if (!entry) {
      this.focusTreeIndex(0);
      return;
    }
    const rtl = this.isRtl();
    const isExpandKey = event.key === (rtl ? 'ArrowLeft' : 'ArrowRight');

    if (isExpandKey) {
      if (!entry.hasChildren) return;
      if (!entry.expanded) {
        this.setTreeNodeExpanded(entry.node, true, event);
      } else {
        this.focusTreeIndex(idx + 1);
      }
    } else {
      if (entry.hasChildren && entry.expanded) {
        this.setTreeNodeExpanded(entry.node, false, event);
      } else if (entry.parent) {
        const parentIdx = rows.findIndex((r) => r.node === entry.parent);
        this.focusTreeIndex(parentIdx);
      }
    }
  }
}
