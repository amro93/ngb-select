export type SelectSize = 'small' | 'medium' | 'large';

export type SelectDisplayMode = 'comma' | 'chip';

export type SelectVariant = 'filled' | 'outlined';

export type SelectFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals';

export type FocusOnOpenStrategy = 'always' | 'notSelected';

export type FloatLabelVariant = 'on' | 'in' | 'over';

export type DropdownDirection = 'auto' | 'up' | 'down' | 'top' | 'bottom';
export type DropdownPosition = DropdownDirection;
export type SelectDropdownPosition = DropdownDirection;

export interface SelectOption {
  label?: string;
  value?: any;
  disabled?: boolean;
  styleClass?: string;
  icon?: string;
  title?: string;
  items?: SelectOption[]; // For grouped options
  [key: string]: any; // Allow arbitrary custom metadata
}

export interface SelectChangeEvent<T = any> {
  originalEvent: Event | null;
  value: T;
}

export interface SelectFilterEvent {
  originalEvent: Event;
  filter: string;
}

export interface SelectSelectAllChangeEvent {
  originalEvent: Event;
  checked: boolean;
}

export interface SelectRemoveChipEvent {
  originalEvent: Event;
  value: any;
}

export interface SelectLazyLoadEvent {
  first: number;
  last: number;
  [key: string]: any;
}

/** Which tree nodes may be selected in tree mode. */
export type TreeSelectableMode = 'all' | 'leaf';

/** A visible (flattened) row rendered in tree mode. */
export interface TreeNodeEntry<T = any> {
  /** The original option object. */
  node: T;
  /** Stable key used for expansion state (option value, dataKey or the node itself). */
  key: any;
  /** Zero-based nesting depth. */
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
  /** Parent option, or null for root nodes. */
  parent: T | null;
}

export const NGB_SELECT_VERSION = '0.1.7';
