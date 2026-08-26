export type SelectSize = 'small' | 'medium' | 'large';

export type SelectDisplayMode = 'comma' | 'chip';

export type SelectVariant = 'filled' | 'outlined';

export type SelectFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals';

export type FocusOnOpenStrategy = 'always' | 'notSelected';

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

export const NGB_SELECT_VERSION = '0.1.1';
