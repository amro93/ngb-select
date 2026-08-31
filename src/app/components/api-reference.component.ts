import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-reference',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mt-4 pt-4 border-top">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 class="fw-bold text-primary mb-1">
            <i class="bi bi-journal-code me-2"></i>API Reference
          </h2>
          <p class="text-muted small mb-0">
            Detailed list of all Input properties, Output events, and Content Templates.
          </p>
        </div>
        <span class="badge bg-light text-dark border">Version: v{{ appVersion }}</span>
      </div>

      <!-- API Tables Card -->
      <div class="card border shadow-sm">
        <div class="card-header bg-body p-0">
          <ul class="nav api-nav-tabs" role="tablist">
            <li class="nav-item">
              <button
                class="nav-link"
                [class.active]="activeApiTab === 'inputs'"
                (click)="activeApiTab = 'inputs'"
              >
                <i class="bi bi-box-arrow-in-right me-1"></i> Properties (@Input)
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                [class.active]="activeApiTab === 'outputs'"
                (click)="activeApiTab = 'outputs'"
              >
                <i class="bi bi-box-arrow-up-right me-1"></i> Events (@Output)
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                [class.active]="activeApiTab === 'templates'"
                (click)="activeApiTab = 'templates'"
              >
                <i class="bi bi-brush me-1"></i> Templates (#refs)
              </button>
            </li>
          </ul>
        </div>
        <div class="card-body p-0">
          <!-- Properties Tab Content -->
          @if (activeApiTab === 'inputs') {
            <div class="table-responsive">
              <table class="table table-hover table-api table-striped mb-0">
                <thead>
                  <tr>
                    <th style="width: 22%">Name</th>
                    <th style="width: 28%">Type</th>
                    <th style="width: 15%">Default</th>
                    <th style="width: 35%">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Group: Basic & Data -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-database me-1"></i> Basic & Data Options
                    </th>
                  </tr>
                  <tr>
                    <td><code>dataKey</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Property identifier used to uniquely compare object options instead of reference equality.</td>
                  </tr>
                  <tr>
                    <td><code>group</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Whether options are categorized into groups with non-selectable headers.</td>
                  </tr>
                  <tr>
                    <td><code>optionDisabled</code></td>
                    <td><code>string</code></td>
                    <td><code>'disabled'</code></td>
                    <td>Property field name in option object determining if the item is disabled.</td>
                  </tr>
                  <tr>
                    <td><code>optionGroupChildren</code></td>
                    <td><code>string</code></td>
                    <td><code>'items'</code></td>
                    <td>Property field name containing the nested array of options in grouped mode.</td>
                  </tr>
                  <tr>
                    <td><code>optionGroupLabel</code></td>
                    <td><code>string</code></td>
                    <td><code>'label'</code></td>
                    <td>Property field name to resolve the label for option group headers.</td>
                  </tr>
                  <tr>
                    <td><code>optionLabel</code></td>
                    <td><code>string</code></td>
                    <td><code>'label'</code></td>
                    <td>Property field name used to extract the display label from an option object.</td>
                  </tr>
                  <tr>
                    <td><code>optionValue</code></td>
                    <td><code>string</code></td>
                    <td><code>'value'</code></td>
                    <td>Property field name to extract the bound value. When undefined, the full object is bound.</td>
                  </tr>
                  <tr>
                    <td><code>options</code></td>
                    <td><code>any[]</code></td>
                    <td><code>[]</code></td>
                    <td>An array of objects or primitive values to display as selectable options.</td>
                  </tr>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Default placeholder text shown in trigger box when no item is selected.</td>
                  </tr>

                  <!-- Group: Multi-Select -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-check2-square me-1"></i> Multi-Select Configuration
                    </th>
                  </tr>
                  <tr>
                    <td><code>closeOnSelect</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Whether to automatically close the overlay panel after an option is selected in multi-select mode.</td>
                  </tr>
                  <tr>
                    <td><code>display</code></td>
                    <td><code>'comma' | 'chip'</code></td>
                    <td><code>'comma'</code></td>
                    <td>Display mode for multiple selections: comma-separated text or removable badge chips.</td>
                  </tr>
                  <tr>
                    <td><code>maxSelectedLabels</code></td>
                    <td><code>number</code></td>
                    <td><code>3</code></td>
                    <td>Threshold count of selected items before condensing labels into summary text.</td>
                  </tr>
                  <tr>
                    <td><code>multiple</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enables multi-selection mode with checkbox controls; binds model to an array.</td>
                  </tr>
                  <tr>
                    <td><code>selectedItemsLabel</code></td>
                    <td><code>string</code></td>
                    <td><code>'&#123;0&#125; items selected'</code></td>
                    <td>Summary template text displayed when selections exceed <code>maxSelectedLabels</code>.</td>
                  </tr>
                  <tr>
                    <td><code>selectionLimit</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>Maximum allowed number of items that can be selected simultaneously.</td>
                  </tr>
                  <tr>
                    <td><code>showSelectAll</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Renders a "Select All" checkbox in the dropdown header in multi-select mode.</td>
                  </tr>

                  <!-- Group: Filtering & Search -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-search me-1"></i> Filtering & Search
                    </th>
                  </tr>
                  <tr>
                    <td><code>emptyFilterMessage</code></td>
                    <td><code>string</code></td>
                    <td><code>'No results found'</code></td>
                    <td>Text displayed inside the panel when no options match the filter query.</td>
                  </tr>
                  <tr>
                    <td><code>emptyMessage</code></td>
                    <td><code>string</code></td>
                    <td><code>'No results found'</code></td>
                    <td>Text displayed inside the panel when the <code>options</code> array is empty.</td>
                  </tr>
                  <tr>
                    <td><code>filter</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enables search/filtering input to filter through available options.</td>
                  </tr>
                  <tr>
                    <td><code>filterBy</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Comma-separated list of object fields to search against (e.g., <code>'name,code'</code>).</td>
                  </tr>
                  <tr>
                    <td><code>filterInTrigger</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Renders the search filter input directly inside the select trigger box instead of the dropdown panel.</td>
                  </tr>
                  <tr>
                    <td><code>filterLocale</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Locale string passed to string comparison during filtering operations.</td>
                  </tr>
                  <tr>
                    <td><code>filterMatchMode</code></td>
                    <td><code>'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals'</code></td>
                    <td><code>'contains'</code></td>
                    <td>Matching algorithm used when filtering items against the search query.</td>
                  </tr>
                  <tr>
                    <td><code>filterNormalizeArabic</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Normalizes Arabic diacritics and character variants (أ إ آ -> ا, ة -> ه, etc.) for intuitive search.</td>
                  </tr>
                  <tr>
                    <td><code>filterPlaceholder</code> / <code>searchPlaceholder</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Placeholder text displayed inside the search filter input.</td>
                  </tr>
                  <tr>
                    <td><code>resetFilterOnHide</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Clears the active filter query automatically when the dropdown panel closes.</td>
                  </tr>

                  <!-- Group: State, Forms & Accessibility -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-ui-checks me-1"></i> State, Forms & Accessibility
                    </th>
                  </tr>
                  <tr>
                    <td><code>ariaLabel</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Defines an <code>aria-label</code> attribute for assistive technologies.</td>
                  </tr>
                  <tr>
                    <td><code>ariaLabelledBy</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Specifies the ID of the element that labels the select component for screen readers.</td>
                  </tr>
                  <tr>
                    <td><code>autofocus</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Automatically focuses the select trigger element when page loads.</td>
                  </tr>
                  <tr>
                    <td><code>dir</code></td>
                    <td><code>'ltr' | 'rtl' | 'auto'</code></td>
                    <td><code>undefined</code></td>
                    <td>Directionality of the component for full RTL support.</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Disables the component preventing user interaction. Supported as two-way model.</td>
                  </tr>
                  <tr>
                    <td><code>floatLabel</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enables Bootstrap-styled floating label integration.</td>
                  </tr>
                  <tr>
                    <td><code>floatLabelVariant</code></td>
                    <td><code>'on' | 'in' | 'over'</code></td>
                    <td><code>'on'</code></td>
                    <td>Floating label positioning: 'on' (on top border), 'in' (inside box), or 'over' (floating above).</td>
                  </tr>
                  <tr>
                    <td><code>id</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Unique identifier assigned to the select trigger element.</td>
                  </tr>
                  <tr>
                    <td><code>invalid</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Applies Bootstrap <code>.is-invalid</code> styling and border highlight to the trigger box.</td>
                  </tr>
                  <tr>
                    <td><code>loading</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Displays a Bootstrap animated loading spinner inside the trigger box.</td>
                  </tr>
                  <tr>
                    <td><code>readonly</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Sets the select box in readonly mode, preventing modifying the value.</td>
                  </tr>
                  <tr>
                    <td><code>showClear</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Displays a clear icon allowing users to reset the current selection to null.</td>
                  </tr>
                  <tr>
                    <td><code>tabindex</code></td>
                    <td><code>number</code></td>
                    <td><code>0</code></td>
                    <td>Tab order index assigned to the focusable trigger element.</td>
                  </tr>

                  <!-- Group: Display, Positioning & Styling -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-palette me-1"></i> Display, Positioning & Styling
                    </th>
                  </tr>
                  <tr>
                    <td><code>appendTo</code></td>
                    <td><code>'body' | HTMLElement | string</code></td>
                    <td><code>undefined</code></td>
                    <td>Appends overlay panel to a target container (e.g., <code>'body'</code>) to bypass parent overflow clipping.</td>
                  </tr>
                  <tr>
                    <td><code>dropdownPosition</code> / <code>dropdownDirection</code> / <code>direction</code></td>
                    <td><code>'auto' | 'top' | 'bottom' | 'up' | 'down'</code></td>
                    <td><code>'auto'</code></td>
                    <td>Overlay panel positioning. <code>'auto'</code> detects available screen viewport and flips upwards when bottom space is constrained.</td>
                  </tr>
                  <tr>
                    <td><code>fluid</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Expands select width to 100% (<code>.w-100</code>) of its parent container.</td>
                  </tr>
                  <tr>
                    <td><code>panelStyle</code></td>
                    <td><code>object</code></td>
                    <td><code>undefined</code></td>
                    <td>Inline CSS styles applied directly to the dropdown/modal overlay panel element.</td>
                  </tr>
                  <tr>
                    <td><code>panelStyleClass</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Custom CSS class names applied to the dropdown/modal overlay panel element.</td>
                  </tr>
                  <tr>
                    <td><code>scrollHeight</code></td>
                    <td><code>string</code></td>
                    <td><code>'200px'</code></td>
                    <td>Maximum scrollable height of the dropdown options list before vertical scrolling occurs.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'small' | 'large'</code></td>
                    <td><code>undefined</code></td>
                    <td>Component sizing (<code>.form-select-sm</code> or <code>.form-select-lg</code>).</td>
                  </tr>
                  <tr>
                    <td><code>style</code></td>
                    <td><code>object</code></td>
                    <td><code>undefined</code></td>
                    <td>Inline CSS styles applied to the root host container.</td>
                  </tr>
                  <tr>
                    <td><code>styleClass</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Custom CSS class names applied to the root host container.</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'outlined' | 'filled'</code></td>
                    <td><code>'outlined'</code></td>
                    <td>Visual style variant (<code>filled</code> adds <code>.bg-light</code>).</td>
                  </tr>

                  <!-- Group: Mobile & Modal Popup Mode -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-phone me-1"></i> Mobile & Modal Popup Mode
                    </th>
                  </tr>
                  <tr>
                    <td><code>modal</code> / <code>popup</code> / <code>touchUI</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Renders options inside a centered native Bootstrap <code>.modal</code> dialog with backdrop (ideal for mobile / touch UI & nested modal-in-modal).</td>
                  </tr>
                  <tr>
                    <td><code>popupTitle</code> / <code>modalTitle</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Title text rendered inside the Bootstrap modal header in modal mode (defaults to <code>placeholder</code>).</td>
                  </tr>

                  <!-- Group: Advanced & Keyboard Navigation -->
                  <tr class="table-group-header">
                    <th colspan="4" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-gear me-1"></i> Advanced & Keyboard Navigation
                    </th>
                  </tr>
                  <tr>
                    <td><code>autoOptionFocus</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Automatically highlights and focuses the selected option when opening the overlay panel.</td>
                  </tr>
                  <tr>
                    <td><code>editable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Combobox mode: allows users to type custom text values not in the predefined options list.</td>
                  </tr>
                  <tr>
                    <td><code>focusOnOpen</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>Zero-based index of option to automatically focus and scroll into view when opening the panel.</td>
                  </tr>
                  <tr>
                    <td><code>focusOnOpenStrategy</code></td>
                    <td><code>'always' | 'notSelected'</code></td>
                    <td><code>'always'</code></td>
                    <td>Determines whether <code>focusOnOpen</code> triggers always or only when no item is selected.</td>
                  </tr>
                  <tr>
                    <td><code>lazy</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enables lazy loading mode, emitting <code>onLazyLoad</code> events on scroll without client-side slicing.</td>
                  </tr>
                  <tr>
                    <td><code>maxLength</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>Maximum character limit for the input element in <code>editable</code> mode.</td>
                  </tr>
                  <tr>
                    <td><code>overlayVisible</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Two-way bound model (<code>[(overlayVisible)]</code>) controlling the open/close visibility state of the overlay.</td>
                  </tr>
                  <tr>
                    <td><code>selectOnFocus</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Automatically selects the focused option when navigating items with arrow keys.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }

          <!-- Events Tab Content -->
          @if (activeApiTab === 'outputs') {
            <div class="table-responsive">
              <table class="table table-hover table-api table-striped mb-0">
                <thead>
                  <tr>
                    <th style="width: 25%">Name</th>
                    <th style="width: 35%">Parameters</th>
                    <th style="width: 40%">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Group: Value Changes -->
                  <tr class="table-group-header">
                    <th colspan="3" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-arrow-repeat me-1"></i> Value & Selection Events
                    </th>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>event: SelectChangeEvent&lt;T&gt;</code></td>
                    <td>Emitted when a new option value is selected by the user.</td>
                  </tr>
                  <tr>
                    <td><code>onClear</code></td>
                    <td><code>event: Event</code></td>
                    <td>Emitted when the clear icon is clicked to reset the value.</td>
                  </tr>
                  <tr>
                    <td><code>onRemoveChip</code></td>
                    <td><code>event: SelectRemoveChipEvent</code></td>
                    <td>Emitted when a selected chip badge is dismissed in multi-select chip mode.</td>
                  </tr>
                  <tr>
                    <td><code>onSelectAllChange</code></td>
                    <td><code>event: SelectSelectAllChangeEvent</code></td>
                    <td>Emitted when the "Select All" checkbox state is toggled in the header.</td>
                  </tr>

                  <!-- Group: Focus & Overlay Lifecycle -->
                  <tr class="table-group-header">
                    <th colspan="3" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-eye me-1"></i> Focus & Overlay Lifecycle Events
                    </th>
                  </tr>
                  <tr>
                    <td><code>onBlur</code></td>
                    <td><code>event: FocusEvent</code></td>
                    <td>Emitted when the select trigger element loses focus.</td>
                  </tr>
                  <tr>
                    <td><code>onFocus</code></td>
                    <td><code>event: FocusEvent</code></td>
                    <td>Emitted when the select trigger element gains focus.</td>
                  </tr>
                  <tr>
                    <td><code>onHide</code></td>
                    <td><code>event: Event | null</code></td>
                    <td>Emitted immediately after the dropdown overlay or modal dialog is closed.</td>
                  </tr>
                  <tr>
                    <td><code>onShow</code></td>
                    <td><code>event: Event | null</code></td>
                    <td>Emitted immediately after the dropdown overlay or modal dialog is opened.</td>
                  </tr>
                  <tr>
                    <td><code>overlayVisibleChange</code></td>
                    <td><code>visible: boolean</code></td>
                    <td>Emitted when overlay visibility changes to support <code>[(overlayVisible)]</code> two-way binding.</td>
                  </tr>

                  <!-- Group: Search & Data Loading -->
                  <tr class="table-group-header">
                    <th colspan="3" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-funnel me-1"></i> Search & Data Loading Events
                    </th>
                  </tr>
                  <tr>
                    <td><code>onFilter</code></td>
                    <td><code>event: SelectFilterEvent</code></td>
                    <td>Emitted when the user types in the filter search input (supports custom backend search).</td>
                  </tr>
                  <tr>
                    <td><code>onLazyLoad</code></td>
                    <td><code>event: SelectLazyLoadEvent</code></td>
                    <td>Emitted when the user scrolls near the bottom of the dropdown panel in lazy mode.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }

          <!-- Templates Tab Content -->
          @if (activeApiTab === 'templates') {
            <div class="table-responsive">
              <table class="table table-hover table-api table-striped mb-0">
                <thead>
                  <tr>
                    <th style="width: 25%">Template Ref</th>
                    <th style="width: 30%">Context Variable</th>
                    <th style="width: 45%">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Group: Options & Trigger -->
                  <tr class="table-group-header">
                    <th colspan="3" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-card-text me-1"></i> Option & Trigger Customization
                    </th>
                  </tr>
                  <tr>
                    <td><code>#chip</code></td>
                    <td><code>let-value</code>, <code>let-option</code></td>
                    <td>Custom template for rendering individual selected chip badges in multi-select mode.</td>
                  </tr>
                  <tr>
                    <td><code>#empty</code></td>
                    <td>-</td>
                    <td>Custom content displayed when no options match the filter or when options list is empty.</td>
                  </tr>
                  <tr>
                    <td><code>#group</code></td>
                    <td><code>let-group</code></td>
                    <td>Custom template for rendering option group category headers.</td>
                  </tr>
                  <tr>
                    <td><code>#item</code></td>
                    <td><code>let-option</code></td>
                    <td>Custom template for rendering each individual option item inside the dropdown list.</td>
                  </tr>
                  <tr>
                    <td><code>#selectedItem</code> / <code>#label</code></td>
                    <td><code>let-value</code>, <code>let-option</code></td>
                    <td>Custom template for rendering the selected value / label inside the trigger box.</td>
                  </tr>

                  <!-- Group: Panel Headers & Footers -->
                  <tr class="table-group-header">
                    <th colspan="3" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-layout-text-window-reverse me-1"></i> Panel Headers & Footers
                    </th>
                  </tr>
                  <tr>
                    <td><code>#footer</code></td>
                    <td>-</td>
                    <td>Custom content template injected at the bottom of the dropdown overlay panel or modal footer.</td>
                  </tr>
                  <tr>
                    <td><code>#header</code></td>
                    <td>-</td>
                    <td>Custom content template injected at the top of the dropdown overlay above search and items.</td>
                  </tr>
                  <tr>
                    <td><code>#headerCheckbox</code></td>
                    <td><code>let-checked</code></td>
                    <td>Custom template for rendering the "Select All" checkbox header control.</td>
                  </tr>

                  <!-- Group: Custom Icons -->
                  <tr class="table-group-header">
                    <th colspan="3" class="bg-light py-2 text-uppercase text-primary small fw-bold">
                      <i class="bi bi-stars me-1"></i> Custom Icon Templates
                    </th>
                  </tr>
                  <tr>
                    <td><code>#clearIcon</code></td>
                    <td>-</td>
                    <td>Custom template to replace the default clear button icon (<code>bi-x-circle-fill</code>).</td>
                  </tr>
                  <tr>
                    <td><code>#dropdownIcon</code></td>
                    <td>-</td>
                    <td>Custom template to replace the default dropdown caret chevron (<code>bi-chevron-down</code>).</td>
                  </tr>
                  <tr>
                    <td><code>#filterIcon</code></td>
                    <td>-</td>
                    <td>Custom template to replace the search magnifying glass icon (<code>bi-search</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ApiReferenceComponent {
  @Input() appVersion = '';
  activeApiTab: 'inputs' | 'outputs' | 'templates' = 'inputs';
}
