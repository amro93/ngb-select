# 02. API and Interfaces

## Core Data Interfaces and Types

```typescript
export type SelectSize = 'small' | 'medium' | 'large';
export type SelectDisplayMode = 'comma' | 'chip';
export type SelectVariant = 'over' | 'in' | 'on';

export interface SelectOption {
  label?: string;
  value?: any;
  disabled?: boolean;
  styleClass?: string;
  icon?: string;
  items?: SelectOption[]; // Used when grouping is enabled
  [key: string]: any; // Catch-all for custom data (e.g., custom templating)
}
```

## Component Inputs (`@Input`)

| Input                   | Type                                            | Default                | Description                                                                                                                       |
| :---------------------- | :---------------------------------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `options`               | `any[]`                                         | `[]`                   | Array of objects or primitives to display. Gracefully handles `null` or `undefined` by defaulting to an empty array.              |
| `optionLabel`           | `string`                                        | `'label'`              | Field name to resolve the option's label.                                                                                         |
| `optionValue`           | `string`                                        | `'value'`              | Field name to resolve the option's value. If undefined, the whole object is used.                                                 |
| `optionDisabled`        | `string`                                        | `'disabled'`           | Field name to determine if the option is disabled.                                                                                |
| `optionGroupLabel`      | `string`                                        | `'label'`              | Field name for the group header.                                                                                                  |
| `optionGroupChildren`   | `string`                                        | `'items'`              | Field name for the group's child elements.                                                                                        |
| `placeholder`           | `string`                                        | `undefined`            | Default text when no option is selected.                                                                                          |
| `filter`                | `boolean`                                       | `false`                | Enables the built-in search filter field.                                                                                         |
| `filterBy`              | `string`                                        | `undefined`            | Comma-separated list of fields to search against (e.g., `'name,country.code'`). Defaults to `optionLabel`.                        |
| `filterPlaceholder`     | `string`                                        | `undefined`            | Placeholder text for the search/filter input (e.g. `'Search...'` or `'ابحث...'`).                                                 |
| `searchPlaceholder`     | `string`                                        | `undefined`            | Alias for `filterPlaceholder`. Custom search text displayed in the search input placeholder.                                      |
| `filterInTrigger`       | `boolean`                                       | `false`                | When enabled, embeds the search filter input directly inside the select trigger/placeholder area instead of in the dropdown menu. |
| `resetFilterOnHide`     | `boolean`                                       | `false`                | Clears the filter input when the dropdown closes.                                                                                 |
| `showClear`             | `boolean`                                       | `false`                | Displays a clear icon when a value is selected.                                                                                   |
| `disabled`              | `boolean`                                       | `false`                | Disables the entire component interactions.                                                                                       |
| `readonly`              | `boolean`                                       | `false`                | Component cannot be interacted with, but allows focusing.                                                                         |
| `loading`               | `boolean`                                       | `false`                | Displays a Bootstrap `.spinner-border` icon.                                                                                      |
| `floatLabel`            | `boolean`                                       | `false`                | Enables floating label styling (`.form-floating`).                                                                                |
| `floatLabelVariant`     | `'on' \| 'in' \| 'over'`                        | `'on'`                 | Floating label style variant: `'on'` (outlined on border), `'in'` (inside box), or `'over'` (above field).                        |
| `invalid`               | `boolean`                                       | `false`                | Applies the `.is-invalid` validation class.                                                                                       |
| `emptyMessage`          | `string`                                        | `'No results found'`   | Text to display when data is empty.                                                                                               |
| `emptyFilterMessage`    | `string`                                        | `'No results found'`   | Text to display when a filter yields no results.                                                                                  |
| `scrollHeight`          | `string`                                        | `'200px'`              | Max height of the dropdown panel before scrolling occurs.                                                                         |
| `tabindex`              | `number`                                        | `0`                    | Tab index of the component for keyboard navigation.                                                                               |
| `focusOnOpen`           | `number`                                        | `undefined`            | The index of the option to programmatically focus/scroll to when the dropdown opens.                                              |
| `focusOnOpenStrategy`   | `'always' \| 'notSelected'`                     | `'always'`             | Determines whether focusOnOpen applies always or only when no item is selected.                                                   |
| `dataKey`               | `string`                                        | `undefined`            | A property to uniquely identify a value in data, useful for object comparison.                                                    |
| `autofocus`             | `boolean`                                       | `false`                | When present, specifies that the component should automatically get focus on load.                                                |
| `size`                  | `SelectSize`                                    | `'medium'`             | Defines the size of the component (`'small'`, `'medium'`, `'large'`). Maps to Bootstrap's `.form-select-sm` or `.form-select-lg`. |
| `multiple`              | `boolean`                                       | `false`                | When specified, allows selecting multiple values (model binds to an array `any[]`).                                               |
| `display`               | `SelectDisplayMode`                             | `'comma'`              | Defines how multiple selected items are displayed in the input field (`'comma'` or `'chip'`).                                     |
| `showSelectAll`         | `boolean`                                       | `false`                | When enabled, renders a "Select All" checkbox header inside the dropdown panel.                                                   |
| `selectAll`             | `boolean \| null`                               | `null`                 | Controls or binds the state of the "Select All" checkbox.                                                                         |
| `selectAllLabel`        | `string`                                        | `'Select All'`         | Text label for the "Select All" checkbox header (e.g. `'تحديد الكل'`).                                                            |
| `maxSelectedLabels`     | `number`                                        | `3`                    | Maximum number of item labels to display in the trigger before switching to summary text.                                         |
| `selectedItemsLabel`    | `string`                                        | `'{0} items selected'` | Label template shown when selection count exceeds `maxSelectedLabels` (e.g. `'{0} عناصر محددة'`).                                 |
| `selectionLimit`        | `number`                                        | `undefined`            | Maximum number of items the user is permitted to select.                                                                          |
| `closeOnSelect`         | `boolean`                                       | `false`                | Whether selecting an item closes the dropdown panel (defaults to false for `multiple: true`).                                     |
| `dir`                   | `'ltr' \| 'rtl' \| 'auto'`                      | `'auto'`               | Text direction for RTL / LTR layout. Inherits from DOM `dir` attribute by default.                                                |
| `dropdownPosition`      | `'auto' \| 'top' \| 'bottom' \| 'up' \| 'down'` | `'auto'`               | Dropdown open direction/position. Automatically flips to top/dropup if bottom space is constrained when set to `'auto'`.          |
| `modal`                 | `boolean`                                       | `false`                | When enabled, opens the options list in a centered modal popup window with backdrop (Touch UI / mobile-friendly).                 |
| `popup`                 | `boolean`                                       | `false`                | Alias for `modal`. Renders the options list in a popup dialog window.                                                             |
| `touchUI`               | `boolean`                                       | `false`                | Alias for `modal`. Optimizes option selection in a touch-friendly popup dialog.                                                   |
| `popupTitle`            | `string`                                        | `undefined`            | Title text displayed in the modal popup window header.                                                                            |
| `appendTo`              | `any`                                           | `undefined`            | Target element to attach the overlay, valid values are "body" or a local ng-template ref.                                         |
| `editable`              | `boolean`                                       | `false`                | When specified, allows users to type values that are not in the options list.                                                     |
| `lazy`                  | `boolean`                                       | `false`                | Defines if data is loaded and interacted with in a lazy manner (useful for infinite scrolling).                                   |
| `variant`               | `SelectVariant`                                 | `'over'`               | The variant property defines the position of the label. Default value is `over`, whereas `in` and `on` are the alternatives.      |
| `id`                    | `string`                                        | `undefined`            | Unique identifier of the element.                                                                                                 |
| `ariaLabel`             | `string`                                        | `undefined`            | Defines a string that labels the input for accessibility.                                                                         |
| `ariaLabelledBy`        | `string`                                        | `undefined`            | Establishes relationships between the component and label(s) using element IDs.                                                   |
| `filterMatchMode`       | `string`                                        | `'contains'`           | Defines how items are filtered (`startsWith`, `contains`, `endsWith`, `equals`, `notEquals`).                                     |
| `filterLocale`          | `string`                                        | `undefined`            | Locale to use in filtering string comparisons (e.g. `'ar'` or `'en'`).                                                            |
| `filterNormalizeArabic` | `boolean`                                       | `true`                 | Normalizes Arabic letters (`[أإآا]`, `[ىي]`, `[ةه]`) and strips diacritics during search.                                         |
| `panelStyle`            | `object`                                        | `undefined`            | Inline style of the dropdown panel.                                                                                               |
| `panelStyleClass`       | `string`                                        | `undefined`            | Style class of the dropdown panel.                                                                                                |
| `style`                 | `object`                                        | `undefined`            | Inline style of the component container.                                                                                          |
| `styleClass`            | `string`                                        | `undefined`            | Style class of the component container.                                                                                           |
| `fluid`                 | `boolean`                                       | `false`                | Whether the component should span 100% width (applies `.w-100`).                                                                  |
| `overlayVisible`        | `boolean`                                       | `false`                | Controls the visibility of the dropdown panel (two-way bindable).                                                                 |
| `autoOptionFocus`       | `boolean`                                       | `true`                 | Whether to automatically focus the first item when the dropdown opens.                                                            |
| `selectOnFocus`         | `boolean`                                       | `false`                | Automatically selects the text inside the input when focused (if `editable` is true).                                             |
| `maxLength`             | `number`                                        | `undefined`            | Maximum length of the editable input field.                                                                                       |

## Component Outputs (`@Output`)

| Output                 | Type                                                     | Description                                                                          |
| :--------------------- | :------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `onChange`             | `EventEmitter<{originalEvent: Event, value: any}>`       | Emitted when value changes.                                                          |
| `onFilter`             | `EventEmitter<{originalEvent: Event, filter: string}>`   | Emitted when data is filtered.                                                       |
| `onFocus`              | `EventEmitter<Event>`                                    | Emitted when the component receives focus.                                           |
| `onBlur`               | `EventEmitter<Event>`                                    | Emitted when the component loses focus.                                              |
| `onShow`               | `EventEmitter<Event>`                                    | Emitted when the dropdown panel opens.                                               |
| `onHide`               | `EventEmitter<Event>`                                    | Emitted when the dropdown panel closes.                                              |
| `onClear`              | `EventEmitter<Event>`                                    | Emitted when the clear icon is clicked.                                              |
| `onSelectAllChange`    | `EventEmitter<{originalEvent: Event, checked: boolean}>` | Emitted when the "Select All" checkbox is toggled.                                   |
| `onRemoveChip`         | `EventEmitter<{originalEvent: Event, value: any}>`       | Emitted when a chip is removed via its close icon.                                   |
| `onLazyLoad`           | `EventEmitter<any>`                                      | Callback to invoke when data needs to be loaded lazily (e.g., scrolled to bottom).   |
| `overlayVisibleChange` | `EventEmitter<boolean>`                                  | Emitted when the visibility of the dropdown panel changes, enabling two-way binding. |

## Content Templates (`@ContentChild`)

You can inject templates using Angular's `<ng-template>` directives by attaching a specific structural directive (e.g., `*ngTemplateOutlet`).

```typescript
@ContentChild('item') itemTemplate: TemplateRef<any>;
@ContentChild('selectedItem') selectedItemTemplate: TemplateRef<any>;
@ContentChild('header') headerTemplate: TemplateRef<any>;
@ContentChild('footer') footerTemplate: TemplateRef<any>;
@ContentChild('group') groupTemplate: TemplateRef<any>;
@ContentChild('empty') emptyTemplate: TemplateRef<any>;
@ContentChild('chip') chipTemplate: TemplateRef<any>;
@ContentChild('headerCheckbox') headerCheckboxTemplate: TemplateRef<any>;
```
