import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ContentChild,
  TemplateRef,
  HostListener,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  SelectOption,
  SelectFilterMatchMode,
  SelectSize,
  SelectVariant,
  SelectDisplayMode,
  SelectChangeEvent,
  SelectFilterEvent,
  SelectSelectAllChangeEvent,
  SelectRemoveChipEvent,
  SelectLazyLoadEvent,
  NGB_SELECT_VERSION
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
      multi: true
    }
  ]
})
export class NgbSelectComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  public static readonly VERSION = NGB_SELECT_VERSION;

  // --- Basic & Data Inputs ---
  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() group: boolean = false;
  @Input() dataKey?: string;
  @Input() placeholder?: string;

  // --- Multi-Select Inputs ---
  @Input() multiple: boolean = false;
  @Input() display: SelectDisplayMode = 'comma';
  @Input() showSelectAll: boolean = false;
  @Input() selectAll: boolean | null = null;
  @Input() maxSelectedLabels: number = 3;
  @Input() selectedItemsLabel: string = '{0} items selected';
  @Input() selectionLimit?: number;
  @Input() closeOnSelect: boolean = false;

  // --- Filtering Inputs ---
  @Input() filter: boolean = false;
  @Input() filterBy?: string;
  @Input() filterMatchMode: SelectFilterMatchMode = 'contains';
  @Input() filterLocale?: string;
  @Input() filterPlaceholder?: string;
  @Input() resetFilterOnHide: boolean = false;
  @Input() emptyMessage: string = 'No results found';
  @Input() emptyFilterMessage: string = 'No results found';

  // --- State & Form Inputs ---
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() loading: boolean = false;
  @Input() showClear: boolean = false;
  @Input() invalid: boolean = false;
  @Input() floatLabel: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() tabindex: number = 0;
  @Input() id?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;

  // --- Display & Styling Inputs ---
  @Input() size?: SelectSize;
  @Input() variant: SelectVariant = 'outlined';
  @Input() fluid: boolean = false;
  @Input() scrollHeight: string = '200px';
  @Input() style?: { [klass: string]: any } | null;
  @Input() styleClass?: string;
  @Input() panelStyle?: { [klass: string]: any } | null;
  @Input() panelStyleClass?: string;
  @Input() appendTo?: 'body' | HTMLElement | string;

  // --- Advanced Features ---
  @Input() editable: boolean = false;
  @Input() maxLength?: number;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = true;
  @Input() focusOnOpen?: number;
  @Input() lazy: boolean = false;

  // --- Two-way Overlay Visibility Binding ---
  @Input() overlayVisible: boolean = false;
  @Output() overlayVisibleChange = new EventEmitter<boolean>();

  // --- Event Outputs ---
  @Output() onChange = new EventEmitter<SelectChangeEvent>();
  @Output() onFilter = new EventEmitter<SelectFilterEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<Event | null>();
  @Output() onHide = new EventEmitter<Event | null>();
  @Output() onClear = new EventEmitter<Event>();
  @Output() onSelectAllChange = new EventEmitter<SelectSelectAllChangeEvent>();
  @Output() onRemoveChip = new EventEmitter<SelectRemoveChipEvent>();
  @Output() onLazyLoad = new EventEmitter<SelectLazyLoadEvent>();

  // --- Custom Content Templates ---
  @ContentChild('item') itemTemplate?: TemplateRef<any>;
  @ContentChild('selectedItem') selectedItemTemplate?: TemplateRef<any>;
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
  @ViewChild('editableInput') editableInputElement?: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownMenu') dropdownMenuElement?: ElementRef<HTMLDivElement>;

  // --- Internal State ---
  public value: any = null;
  public filteredOptions: any[] = [];
  public filterValue: string = '';
  public focusedIndex: number = -1;

  // --- ControlValueAccessor Callbacks ---
  private onModelChange: (value: any) => void = () => {};
  private onModelTouched: () => void = () => {};

  constructor(
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateFilteredOptions();
    if (this.autofocus) {
      setTimeout(() => this.focus());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['group']) {
      this.updateFilteredOptions();
      this.updateSelectAllState();
    }
    if (changes['overlayVisible'] && !changes['overlayVisible'].firstChange) {
      if (this.overlayVisible) {
        this.openOverlay();
      } else {
        this.closeOverlay();
      }
    }
  }

  ngOnDestroy(): void {
    this.cleanAppendTo();
  }

  get safeOptions(): any[] {
    return Array.isArray(this.options) ? this.options : [];
  }

  writeValue(obj: any): void {
    if (this.multiple) {
      this.value = Array.isArray(obj) ? [...obj] : [];
    } else {
      this.value = obj !== undefined ? obj : null;
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
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  hasSelectedValue(): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.length > 0;
    }
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  getDisplayLabel(): string {
    if (!this.hasSelectedValue()) {
      return '';
    }

    if (this.multiple) {
      const selectedList = Array.isArray(this.value) ? this.value : [];
      if (selectedList.length > this.maxSelectedLabels) {
        return this.selectedItemsLabel.replace('{0}', String(selectedList.length));
      }
      return selectedList.map(val => this.resolveOptionLabelByValue(val)).join(', ');
    }

    if (this.editable && typeof this.value === 'string') {
      return this.value;
    }

    return this.resolveOptionLabelByValue(this.value);
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
      if (this.optionLabel && option[this.optionLabel] !== undefined) {
        return String(option[this.optionLabel]);
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
      if (this.optionValue && option[this.optionValue] !== undefined) {
        return option[this.optionValue];
      }
      if (option.value !== undefined) {
        return option.value;
      }
    }
    return option;
  }

  isOptionDisabled(option: any): boolean {
    if (this.disabled) return true;
    if (option && typeof option === 'object') {
      if (this.optionDisabled && option[this.optionDisabled] !== undefined) {
        return Boolean(option[this.optionDisabled]);
      }
      return Boolean(option.disabled);
    }
    return false;
  }

  resolveOptionGroupLabel(groupOption: any): string {
    if (!groupOption) return '';
    if (this.optionGroupLabel && groupOption[this.optionGroupLabel] !== undefined) {
      return String(groupOption[this.optionGroupLabel]);
    }
    return String(groupOption.label || '');
  }

  resolveOptionGroupChildren(groupOption: any): any[] {
    if (!groupOption) return [];
    if (this.optionGroupChildren && Array.isArray(groupOption[this.optionGroupChildren])) {
      return groupOption[this.optionGroupChildren];
    }
    return Array.isArray(groupOption.items) ? groupOption.items : [];
  }

  findOptionByValue(val: any): any {
    if (val === null || val === undefined) return undefined;
    if (this.group) {
      for (const grp of this.safeOptions) {
        const children = this.resolveOptionGroupChildren(grp);
        const match = children.find(opt => this.areValuesEqual(this.resolveOptionValue(opt), val));
        if (match !== undefined) return match;
      }
      return undefined;
    }
    return this.safeOptions.find(opt => this.areValuesEqual(this.resolveOptionValue(opt), val));
  }

  areValuesEqual(val1: any, val2: any): boolean {
    if (val1 === val2) return true;
    if (val1 === null || val1 === undefined || val2 === null || val2 === undefined) return false;
    if (this.dataKey && typeof val1 === 'object' && typeof val2 === 'object') {
      return val1[this.dataKey] === val2[this.dataKey];
    }
    return false;
  }

  isSelected(option: any): boolean {
    const optVal = this.resolveOptionValue(option);
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.some(item => this.areValuesEqual(item, optVal));
    }
    return this.areValuesEqual(this.value, optVal);
  }

  isOptionsEmpty(): boolean {
    if (this.filteredOptions.length === 0) return true;
    if (this.group) {
      return this.filteredOptions.every(grp => this.resolveOptionGroupChildren(grp).length === 0);
    }
    return false;
  }

  onTriggerClick(event: MouseEvent): void {
    if (this.disabled || this.readonly) return;
    this.toggleOverlay(event);
  }

  toggleOverlay(event?: Event): void {
    if (this.overlayVisible) {
      this.closeOverlay(event);
    } else {
      this.openOverlay(event);
    }
  }

  openOverlay(event?: Event): void {
    if (this.disabled || this.readonly || this.overlayVisible) return;

    this.overlayVisible = true;
    this.overlayVisibleChange.emit(true);
    this.onShow.emit(event || null);
    this.onModelTouched();

    setTimeout(() => {
      if (this.filter && this.filterInputElement) {
        this.filterInputElement.nativeElement.focus();
      }
      this.handleFocusOnOpen();
      this.handleAppendTo();
    });
  }

  closeOverlay(event?: Event): void {
    if (!this.overlayVisible) return;

    this.overlayVisible = false;
    this.overlayVisibleChange.emit(false);
    this.onHide.emit(event || null);

    if (this.resetFilterOnHide && this.filterValue) {
      this.filterValue = '';
      this.updateFilteredOptions();
    }
    this.focusedIndex = -1;
  }

  private handleFocusOnOpen(): void {
    const flatItems = this.getFlatFilteredOptions();
    let targetIndex = -1;

    if (this.focusOnOpen !== undefined && this.focusOnOpen >= 0 && this.focusOnOpen < flatItems.length) {
      targetIndex = this.focusOnOpen;
    } else if (this.autoOptionFocus) {
      const selectedIdx = flatItems.findIndex(opt => this.isSelected(opt));
      targetIndex = selectedIdx !== -1 ? selectedIdx : 0;
    }

    if (targetIndex !== -1 && this.dropdownMenuElement) {
      this.focusedIndex = targetIndex;
      const elements = this.dropdownMenuElement.nativeElement.querySelectorAll('.dropdown-item[role="option"]');
      const targetElement = elements[targetIndex] as HTMLElement;
      if (targetElement && typeof targetElement.scrollIntoView === 'function') {
        targetElement.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    }
  }

  onOptionClick(option: any, event: Event): void {
    if (this.isOptionDisabled(option)) return;

    const val = this.resolveOptionValue(option);

    if (this.multiple) {
      let currentSelection: any[] = Array.isArray(this.value) ? [...this.value] : [];
      const selectedIndex = currentSelection.findIndex(item => this.areValuesEqual(item, val));

      if (selectedIndex !== -1) {
        currentSelection.splice(selectedIndex, 1);
      } else {
        if (this.selectionLimit !== undefined && currentSelection.length >= this.selectionLimit) {
          return;
        }
        currentSelection.push(val);
      }

      this.updateModel(currentSelection, event);
      this.updateSelectAllState();

      if (this.closeOnSelect) {
        this.closeOverlay(event);
      }
    } else {
      this.updateModel(val, event);
      this.closeOverlay(event);
    }
  }

  removeChip(val: any, event: Event): void {
    event.stopPropagation();
    if (this.disabled || this.readonly) return;

    if (Array.isArray(this.value)) {
      const nextVal = this.value.filter(item => !this.areValuesEqual(item, val));
      this.updateModel(nextVal, event);
      this.onRemoveChip.emit({ originalEvent: event, value: val });
      this.updateSelectAllState();
    }
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const targetOptions = this.getFlatFilteredOptions().filter(opt => !this.isOptionDisabled(opt));

    if (checked) {
      let allValues = targetOptions.map(opt => this.resolveOptionValue(opt));
      if (this.selectionLimit !== undefined) {
        allValues = allValues.slice(0, this.selectionLimit);
      }
      this.value = allValues;
    } else {
      this.value = [];
    }

    this.selectAll = checked;
    this.updateModel(this.value, event);
    this.onSelectAllChange.emit({ originalEvent: event, checked });
  }

  updateSelectAllState(): void {
    if (!this.multiple || !this.showSelectAll) return;
    const targetOptions = this.getFlatFilteredOptions().filter(opt => !this.isOptionDisabled(opt));
    if (targetOptions.length === 0) {
      this.selectAll = false;
      return;
    }
    this.selectAll = targetOptions.every(opt => this.isSelected(opt));
  }

  private updateModel(val: any, event: Event | null): void {
    this.value = val;
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
    this.cdr.markForCheck();
  }

  onClearClick(event: Event): void {
    event.stopPropagation();
    if (this.disabled || this.readonly) return;

    const clearedValue = this.multiple ? [] : null;
    this.updateModel(clearedValue, event);
    this.updateSelectAllState();
    this.onClear.emit(event);
  }

  onEditableInput(event: Event): void {
    const inputVal = (event.target as HTMLInputElement).value;
    this.updateModel(inputVal, event);
  }

  onEditableFocus(event: FocusEvent): void {
    if (this.selectOnFocus && this.editableInputElement) {
      this.editableInputElement.nativeElement.select();
    }
    this.onFocus.emit(event);
  }

  onFilterChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value || '';
    this.filterValue = raw;
    this.updateFilteredOptions();
    this.updateSelectAllState();
    this.onFilter.emit({
      originalEvent: event,
      filter: this.filterValue
    });
  }

  updateFilteredOptions(): void {
    if (!this.filterValue) {
      this.filteredOptions = [...this.safeOptions];
      return;
    }

    const query = this.filterValue;

    if (this.group) {
      this.filteredOptions = this.safeOptions
        .map(group => {
          const children = this.resolveOptionGroupChildren(group);
          const filteredChildren = children.filter(opt => this.matchesFilter(opt, query));
          return {
            ...group,
            [this.optionGroupChildren]: filteredChildren
          };
        })
        .filter(group => this.resolveOptionGroupChildren(group).length > 0);
    } else {
      this.filteredOptions = this.safeOptions.filter(opt => this.matchesFilter(opt, query));
    }
  }

  private matchesFilter(option: any, query: string): boolean {
    if (!option) return false;
    const fieldsToSearch = this.getFilterFields();

    return fieldsToSearch.some(field => {
      const val = this.resolveFieldData(option, field);
      if (val === null || val === undefined) return false;

      const stringVal = String(val);
      return this.compareStrings(stringVal, query, this.filterMatchMode, this.filterLocale);
    });
  }

  private getFilterFields(): string[] {
    if (this.filterBy) {
      return this.filterBy.split(',').map(f => f.trim());
    }
    return [this.optionLabel || 'label'];
  }

  private resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') === -1) {
        return data[field] !== undefined ? data[field] : (typeof data === 'string' || typeof data === 'number' ? data : null);
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

  private compareStrings(val: string, query: string, mode: SelectFilterMatchMode, locale?: string): boolean {
    const v = locale ? val.toLocaleLowerCase(locale) : val.toLowerCase();
    const q = locale ? query.toLocaleLowerCase(locale) : query.toLowerCase();

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
    if (this.group) {
      const flat: any[] = [];
      for (const grp of this.filteredOptions) {
        flat.push(...this.resolveOptionGroupChildren(grp));
      }
      return flat;
    }
    return this.filteredOptions;
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.overlayVisible) {
          this.openOverlay(event);
        } else {
          this.navigateOption(1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.overlayVisible) {
          this.openOverlay(event);
        } else {
          this.navigateOption(-1);
        }
        break;

      case 'Enter':
      case ' ':
        if (event.key === ' ' && this.filter && this.filterInputElement?.nativeElement === document.activeElement) {
          return;
        }
        event.preventDefault();
        if (!this.overlayVisible) {
          this.openOverlay(event);
        } else {
          const flatItems = this.getFlatFilteredOptions();
          if (this.focusedIndex >= 0 && this.focusedIndex < flatItems.length) {
            this.onOptionClick(flatItems[this.focusedIndex], event);
          }
        }
        break;

      case 'Escape':
        if (this.overlayVisible) {
          event.preventDefault();
          this.closeOverlay(event);
        }
        break;

      case 'Tab':
        if (this.overlayVisible) {
          this.closeOverlay(event);
        }
        break;
    }
  }

  onFilterKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
      this.onKeydown(event);
    }
  }

  private navigateOption(step: number): void {
    const flatItems = this.getFlatFilteredOptions();
    if (flatItems.length === 0) return;

    let nextIdx = this.focusedIndex + step;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= flatItems.length) nextIdx = flatItems.length - 1;

    while (nextIdx >= 0 && nextIdx < flatItems.length && this.isOptionDisabled(flatItems[nextIdx])) {
      nextIdx += step;
    }

    if (nextIdx >= 0 && nextIdx < flatItems.length) {
      this.focusedIndex = nextIdx;
      if (this.dropdownMenuElement) {
        const elements = this.dropdownMenuElement.nativeElement.querySelectorAll('.dropdown-item[role="option"]');
        const targetElement = elements[nextIdx] as HTMLElement;
        if (targetElement && typeof targetElement.scrollIntoView === 'function') {
          targetElement.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
      }
    }
  }

  onOverlayScroll(event: Event): void {
    if (!this.lazy) return;
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      const flat = this.getFlatFilteredOptions();
      this.onLazyLoad.emit({
        first: flat.length,
        last: flat.length + 10
      });
    }
  }

  private handleAppendTo(): void {
    if (!this.appendTo || !this.dropdownMenuElement) return;
    if (this.appendTo === 'body') {
      document.body.appendChild(this.dropdownMenuElement.nativeElement);
      this.repositionOverlay();
    } else if (this.appendTo instanceof HTMLElement) {
      this.appendTo.appendChild(this.dropdownMenuElement.nativeElement);
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
  }

  private cleanAppendTo(): void {
    if (this.appendTo && this.dropdownMenuElement && this.dropdownMenuElement.nativeElement.parentElement === document.body) {
      document.body.removeChild(this.dropdownMenuElement.nativeElement);
    }
  }

  onTriggerFocus(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  onTriggerBlur(event: FocusEvent): void {
    this.onBlur.emit(event);
  }

  public focus(): void {
    if (this.editable && !this.multiple && this.editableInputElement) {
      this.editableInputElement.nativeElement.focus();
    } else {
      const trigger = this.elementRef.nativeElement.querySelector('.form-select');
      if (trigger) trigger.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.overlayVisible && !this.elementRef.nativeElement.contains(event.target)) {
      if (this.dropdownMenuElement && this.dropdownMenuElement.nativeElement.contains(event.target as Node)) {
        return;
      }
      this.closeOverlay(event);
    }
  }
}
