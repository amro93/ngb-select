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

export type SelectFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals';

export type SelectSize = 'small' | 'large';

export type SelectVariant = 'filled' | 'outlined';

export interface SelectChangeEvent<T = any> {
  originalEvent: Event | null;
  value: T;
}

export interface SelectFilterEvent {
  originalEvent: Event;
  filter: string;
}

export interface SelectLazyLoadEvent {
  first: number;
  last: number;
  [key: string]: any;
}
