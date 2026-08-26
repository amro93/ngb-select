# 01. Architecture and Features

## Overview
This Standard Operating Procedure (SOP) outlines the architectural approach for `NgbSelectComponent`, a highly customizable, standalone Angular select component. It is strictly designed to depend **only on Bootstrap 5 CSS classes** (no external JavaScript UI libraries, neither ng-bootstrap nor ngx-bootstrap), providing parity with the PrimeNG Select component.

## Technical Architecture

### 1. Component State Management
The component maintains an internal state independent of the view until explicitly synced via the `ControlValueAccessor`. Key states include:
- `overlayVisible`: Boolean determining if the dropdown panel is visible.
- `value`: The currently selected model (can be primitive or object).
- `filteredOptions`: A clone or subset of the `options` array used exclusively for rendering when the filter is active.

### 2. Styling and DOM Structure
The component avoids Angular Animations and relies purely on Bootstrap 5's utility and component classes:
- **Pseudo-Select:** A `div` styled identically to a standard `<select>` using `.form-select`. It acts as the trigger.
- **Overlay:** The dropdown list is styled with `.dropdown-menu`. Its visibility is toggled by appending the `.show` class dynamically via Angular (`[class.show]="overlayVisible"`).
- **Float Label:** Built-in compatibility with Bootstrap's `.form-floating`. This requires the internal trigger to be wrapped correctly and a sibling `<label>` to be present.

### 3. Accessibility (A11y)
To ensure WCAG compliance, the component must implement strict ARIA guidelines:
- The main container acts as `role="combobox"` with `aria-haspopup="listbox"` and `aria-expanded` bound to `overlayVisible`.
- The dropdown list container implements `role="listbox"`.
- Each option implements `role="option"` with `aria-selected` dynamically evaluating whether it matches the current `value`.
- Keyboard navigation (Arrow Up/Down, Enter, Escape, Space) is implemented natively in the component via `@HostListener('keydown')`.

## Comprehensive Feature List

- **Basic Selection:** Support for arrays of strings, numbers, or complex objects.
- **Data Binding:** `ngModel` and Reactive Forms support via `ControlValueAccessor`.
- **Templating:**
  - `selectedItemTemplate`: Define how the selected value is displayed in the input area.
  - `itemTemplate`: Define how each individual option is rendered.
  - `groupTemplate`: Define the layout for the group header.
  - `headerTemplate` / `footerTemplate`: Injectable areas at the top and bottom of the dropdown overlay.
  - `clearIconTemplate` / `dropdownIconTemplate`: Overrides for the default SVG/Font icons.
- **Grouping:** Group related options. The data structure requires an array containing objects that have a label and a `children` array.
- **Filtering (Search):** Built-in text input to filter available options locally. Supports customized `filterBy` fields and empty states (`emptyMessage`).
- **Clearable:** A clear icon (`showClear`) that resets the model to `null`.
- **Editable (Combobox):** Allows entering custom values directly via an internal input when `editable` is true.
- **Lazy Loading:** `onLazyLoad` event support to dynamically load chunks of data for infinite scrolling scenarios.
- **UI Variants & Sizes:** Configurable input sizing (`small`, `large`) mapped to `.form-select-sm`/`lg`, and `variant` (`filled`, `outlined`).
- **Overlay Append Target:** The `appendTo` feature allows appending the overlay directly to the `body` or a specific DOM element to prevent clipping in hidden-overflow containers.
- **States:** Full support for `disabled`, `readonly`, and `loading` (spinner) states.
- **Virtual Scrolling Alternative:** Due to pure Bootstrap constraints, long lists utilize CSS `max-height` (e.g., `300px`) combined with `overflow-y-auto` to maintain performance without requiring the Angular CDK.
- **Initial Focus:** Ability to programmatically focus or scroll to a specific option index when the dropdown overlay opens.
- **Multi-Select & Checkboxes:** Enables selecting multiple items with checkboxes rendered inside dropdown items (`multiple="true"`). The model value binds to an array (`any[]`).
- **Display Modes (Comma vs Chips):** Selected items can be rendered as comma-separated labels (e.g. `'New York, Rome'`) or removable Bootstrap badges/chips (`display="chip"`).
- **Select All Header:** Optional sticky header checkbox (`showSelectAll="true"`) to toggle selection for all items, taking active search filter criteria into account.
- **Selection Limits:** Restrict the maximum allowed selections using `selectionLimit`.
- **RTL (Right-to-Left) & Arabic Support:** Built-in bidirectional support conforming to Bootstrap 5 RTL (`bootstrap.rtl.min.css` and `dir="rtl"`). Uses CSS logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`) so triggers, carets, clear icons, search filters, and chips automatically mirror in RTL environments.
- **Arabic Text Normalization & Filtering:** Intelligent Arabic search handling that normalizes Alef forms (`أ`, `إ`, `آ`, `ا`), Yaa forms (`ي`, `ى`), Taa Marbuta (`ة`, `ه`), and strips Arabic diacritics (Tashkeel) during client-side search.
- **Arabic Showcase Demo:** Dedicated Arabic demo variant demonstrating RTL single/multi-select, Arabic grouped datasets (e.g. Arab League regions), and Arabic error states.
- **Modern Forms & Signals:** First-class support for `FormControl`, `ReactiveFormsModule`, and Angular's modern `model()` Signals alongside standard `ngModel`.
