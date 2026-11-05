import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbSelectComponent } from '../../../lib/ngb-select.component';
import { ExampleCardComponent } from '../example-card.component';
import { OBJECT_CITIES, GROUPED_CARS } from '../../data/demo-data';

type ControlType = 'boolean' | 'text' | 'number' | 'select';

interface PlaygroundControl {
  key: string;
  type: ControlType;
  group: string;
  choices?: (string | undefined)[];
}

/** Every bindable property of <ngb-select> with its default value. */
const DEFAULTS: any = {
  // Data
  dataKey: 'code',
  placeholder: 'Select an option',
  group: false,
  // Selection
  multiple: false,
  display: 'comma',
  showSelectAll: false,
  maxSelectedLabels: 3,
  selectedItemsLabel: '{0} items selected',
  selectionLimit: undefined,
  closeOnSelect: false,
  // Filtering
  filter: false,
  filterBy: undefined,
  filterMatchMode: 'contains',
  filterLocale: undefined,
  filterNormalizeArabic: true,
  filterPlaceholder: undefined,
  searchPlaceholder: undefined,
  filterInTrigger: false,
  resetFilterOnHide: false,
  emptyMessage: 'No results found',
  emptyFilterMessage: 'No results found',
  // State
  disabled: false,
  readonly: false,
  loading: false,
  showClear: false,
  invalid: false,
  floatLabel: false,
  floatLabelVariant: 'on',
  autofocus: false,
  tabindex: 0,
  id: undefined,
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  dir: undefined,
  // Layout
  dropdownPosition: 'auto',
  dropdownDirection: undefined,
  size: undefined,
  variant: 'outlined',
  fluid: true,
  scrollHeight: '200px',
  styleClass: undefined,
  panelStyleClass: undefined,
  appendTo: undefined,
  // Modal / popup
  modal: false,
  popup: false,
  touchUI: false,
  popupTitle: undefined,
  modalTitle: undefined,
  // Advanced
  editable: false,
  maxLength: undefined,
  selectOnFocus: false,
  autoOptionFocus: true,
  focusOnOpen: undefined,
  focusOnOpenStrategy: 'always',
  lazy: false,
  overlayVisible: false,
};

const DIRS = [undefined, 'auto', 'up', 'down', 'top', 'bottom'];

const CONTROLS: PlaygroundControl[] = [
  { key: 'dataKey', type: 'text', group: 'Data' },
  { key: 'placeholder', type: 'text', group: 'Data' },
  { key: 'group', type: 'boolean', group: 'Data' },

  { key: 'multiple', type: 'boolean', group: 'Selection' },
  { key: 'display', type: 'select', group: 'Selection', choices: ['comma', 'chip'] },
  { key: 'showSelectAll', type: 'boolean', group: 'Selection' },
  { key: 'maxSelectedLabels', type: 'number', group: 'Selection' },
  { key: 'selectedItemsLabel', type: 'text', group: 'Selection' },
  { key: 'selectionLimit', type: 'number', group: 'Selection' },
  { key: 'closeOnSelect', type: 'boolean', group: 'Selection' },

  { key: 'filter', type: 'boolean', group: 'Filtering' },
  { key: 'filterBy', type: 'text', group: 'Filtering' },
  {
    key: 'filterMatchMode',
    type: 'select',
    group: 'Filtering',
    choices: ['contains', 'startsWith', 'endsWith', 'equals', 'notEquals'],
  },
  { key: 'filterLocale', type: 'text', group: 'Filtering' },
  { key: 'filterNormalizeArabic', type: 'boolean', group: 'Filtering' },
  { key: 'filterPlaceholder', type: 'text', group: 'Filtering' },
  { key: 'searchPlaceholder', type: 'text', group: 'Filtering' },
  { key: 'filterInTrigger', type: 'boolean', group: 'Filtering' },
  { key: 'resetFilterOnHide', type: 'boolean', group: 'Filtering' },
  { key: 'emptyMessage', type: 'text', group: 'Filtering' },
  { key: 'emptyFilterMessage', type: 'text', group: 'Filtering' },

  { key: 'disabled', type: 'boolean', group: 'State & A11y' },
  { key: 'readonly', type: 'boolean', group: 'State & A11y' },
  { key: 'loading', type: 'boolean', group: 'State & A11y' },
  { key: 'showClear', type: 'boolean', group: 'State & A11y' },
  { key: 'invalid', type: 'boolean', group: 'State & A11y' },
  { key: 'floatLabel', type: 'boolean', group: 'State & A11y' },
  { key: 'floatLabelVariant', type: 'select', group: 'State & A11y', choices: ['on', 'in', 'over'] },
  { key: 'autofocus', type: 'boolean', group: 'State & A11y' },
  { key: 'tabindex', type: 'number', group: 'State & A11y' },
  { key: 'id', type: 'text', group: 'State & A11y' },
  { key: 'ariaLabel', type: 'text', group: 'State & A11y' },
  { key: 'ariaLabelledBy', type: 'text', group: 'State & A11y' },
  { key: 'dir', type: 'select', group: 'State & A11y', choices: [undefined, 'ltr', 'rtl', 'auto'] },

  { key: 'dropdownPosition', type: 'select', group: 'Layout', choices: DIRS.slice(1) },
  { key: 'dropdownDirection', type: 'select', group: 'Layout', choices: DIRS },
  { key: 'size', type: 'select', group: 'Layout', choices: [undefined, 'small', 'medium', 'large'] },
  { key: 'variant', type: 'select', group: 'Layout', choices: ['outlined', 'filled'] },
  { key: 'fluid', type: 'boolean', group: 'Layout' },
  { key: 'scrollHeight', type: 'text', group: 'Layout' },
  { key: 'styleClass', type: 'text', group: 'Layout' },
  { key: 'panelStyleClass', type: 'text', group: 'Layout' },
  { key: 'appendTo', type: 'select', group: 'Layout', choices: [undefined, 'body'] },

  { key: 'modal', type: 'boolean', group: 'Modal & Popup' },
  { key: 'popup', type: 'boolean', group: 'Modal & Popup' },
  { key: 'touchUI', type: 'boolean', group: 'Modal & Popup' },
  { key: 'popupTitle', type: 'text', group: 'Modal & Popup' },
  { key: 'modalTitle', type: 'text', group: 'Modal & Popup' },

  { key: 'editable', type: 'boolean', group: 'Advanced' },
  { key: 'maxLength', type: 'number', group: 'Advanced' },
  { key: 'selectOnFocus', type: 'boolean', group: 'Advanced' },
  { key: 'autoOptionFocus', type: 'boolean', group: 'Advanced' },
  { key: 'focusOnOpen', type: 'number', group: 'Advanced' },
  {
    key: 'focusOnOpenStrategy',
    type: 'select',
    group: 'Advanced',
    choices: ['always', 'notSelected'],
  },
  { key: 'lazy', type: 'boolean', group: 'Advanced' },
  { key: 'overlayVisible', type: 'boolean', group: 'Advanced' },
];

@Component({
  selector: 'app-playground-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbSelectComponent, ExampleCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="col-12" id="playground">
      <app-example-card
        title="29. Property Playground"
        icon="bi bi-sliders"
        iconClass="text-primary"
        [htmlCode]="htmlSnippet()"
      >
        <p class="text-muted small mb-3">
          Tweak every bindable property of <code>&lt;ngb-select&gt;</code> live. The HTML tab shows
          the template for the current configuration (only non-default values).
        </p>

        @let c = config();
        <div class="mb-3 p-3 border rounded">
          <label class="form-label text-muted small fw-semibold" id="playgroundLabel"
            >Playground select</label
          >
          @if (c.group) {
            <ngb-select
              [options]="groupedCars"
              [(ngModel)]="value"
              [group]="true"
              optionLabel="label"
              optionValue="value"
              [dataKey]="undefined"
              [placeholder]="c.placeholder"
              [multiple]="c.multiple"
              [display]="c.display"
              [showSelectAll]="c.showSelectAll"
              [maxSelectedLabels]="c.maxSelectedLabels"
              [selectedItemsLabel]="c.selectedItemsLabel"
              [selectionLimit]="c.selectionLimit"
              [closeOnSelect]="c.closeOnSelect"
              [filter]="c.filter"
              [filterBy]="c.filterBy"
              [filterMatchMode]="c.filterMatchMode"
              [filterLocale]="c.filterLocale"
              [filterNormalizeArabic]="c.filterNormalizeArabic"
              [filterPlaceholder]="c.filterPlaceholder"
              [searchPlaceholder]="c.searchPlaceholder"
              [filterInTrigger]="c.filterInTrigger"
              [resetFilterOnHide]="c.resetFilterOnHide"
              [emptyMessage]="c.emptyMessage"
              [emptyFilterMessage]="c.emptyFilterMessage"
              [disabled]="c.disabled"
              [readonly]="c.readonly"
              [loading]="c.loading"
              [showClear]="c.showClear"
              [invalid]="c.invalid"
              [floatLabel]="c.floatLabel"
              [floatLabelVariant]="c.floatLabelVariant"
              [autofocus]="c.autofocus"
              [tabindex]="c.tabindex"
              [id]="c.id"
              [ariaLabel]="c.ariaLabel"
              [ariaLabelledBy]="c.ariaLabelledBy"
              [dir]="c.dir"
              [dropdownPosition]="c.dropdownPosition"
              [dropdownDirection]="c.dropdownDirection"
              [size]="c.size"
              [variant]="c.variant"
              [fluid]="c.fluid"
              [scrollHeight]="c.scrollHeight"
              [styleClass]="c.styleClass"
              [panelStyleClass]="c.panelStyleClass"
              [appendTo]="c.appendTo"
              [modal]="c.modal"
              [popup]="c.popup"
              [touchUI]="c.touchUI"
              [popupTitle]="c.popupTitle"
              [modalTitle]="c.modalTitle"
              [editable]="c.editable"
              [maxLength]="c.maxLength"
              [selectOnFocus]="c.selectOnFocus"
              [autoOptionFocus]="c.autoOptionFocus"
              [focusOnOpen]="c.focusOnOpen"
              [focusOnOpenStrategy]="c.focusOnOpenStrategy"
              [lazy]="c.lazy"
              [overlayVisible]="c.overlayVisible"
              (overlayVisibleChange)="set('overlayVisible', $event)"
              (onChange)="log('onChange', $event.value)"
              (onFilter)="log('onFilter', $event)"
              (onShow)="log('onShow')"
              (onHide)="log('onHide')"
              (onClear)="log('onClear')"
            ></ngb-select>
          } @else {
            <ngb-select
              [options]="cities"
              [(ngModel)]="value"
              optionLabel="name"
              [dataKey]="c.dataKey"
              [placeholder]="c.placeholder"
              [multiple]="c.multiple"
              [display]="c.display"
              [showSelectAll]="c.showSelectAll"
              [maxSelectedLabels]="c.maxSelectedLabels"
              [selectedItemsLabel]="c.selectedItemsLabel"
              [selectionLimit]="c.selectionLimit"
              [closeOnSelect]="c.closeOnSelect"
              [filter]="c.filter"
              [filterBy]="c.filterBy"
              [filterMatchMode]="c.filterMatchMode"
              [filterLocale]="c.filterLocale"
              [filterNormalizeArabic]="c.filterNormalizeArabic"
              [filterPlaceholder]="c.filterPlaceholder"
              [searchPlaceholder]="c.searchPlaceholder"
              [filterInTrigger]="c.filterInTrigger"
              [resetFilterOnHide]="c.resetFilterOnHide"
              [emptyMessage]="c.emptyMessage"
              [emptyFilterMessage]="c.emptyFilterMessage"
              [disabled]="c.disabled"
              [readonly]="c.readonly"
              [loading]="c.loading"
              [showClear]="c.showClear"
              [invalid]="c.invalid"
              [floatLabel]="c.floatLabel"
              [floatLabelVariant]="c.floatLabelVariant"
              [autofocus]="c.autofocus"
              [tabindex]="c.tabindex"
              [id]="c.id"
              [ariaLabel]="c.ariaLabel"
              [ariaLabelledBy]="c.ariaLabelledBy"
              [dir]="c.dir"
              [dropdownPosition]="c.dropdownPosition"
              [dropdownDirection]="c.dropdownDirection"
              [size]="c.size"
              [variant]="c.variant"
              [fluid]="c.fluid"
              [scrollHeight]="c.scrollHeight"
              [styleClass]="c.styleClass"
              [panelStyleClass]="c.panelStyleClass"
              [appendTo]="c.appendTo"
              [modal]="c.modal"
              [popup]="c.popup"
              [touchUI]="c.touchUI"
              [popupTitle]="c.popupTitle"
              [modalTitle]="c.modalTitle"
              [editable]="c.editable"
              [maxLength]="c.maxLength"
              [selectOnFocus]="c.selectOnFocus"
              [autoOptionFocus]="c.autoOptionFocus"
              [focusOnOpen]="c.focusOnOpen"
              [focusOnOpenStrategy]="c.focusOnOpenStrategy"
              [lazy]="c.lazy"
              [overlayVisible]="c.overlayVisible"
              (overlayVisibleChange)="set('overlayVisible', $event)"
              (onChange)="log('onChange', $event.value)"
              (onFilter)="log('onFilter', $event)"
              (onShow)="log('onShow')"
              (onHide)="log('onHide')"
              (onClear)="log('onClear')"
            ></ngb-select>
          }
          <div class="mt-2 p-2 bg-light rounded text-muted small">
            <strong>Value:</strong> <code>{{ value | json }}</code>
          </div>
          <div class="mt-1 small text-muted">
            <strong>Last event:</strong> <code>{{ lastEvent() }}</code>
          </div>
        </div>

        <div class="d-flex justify-content-end mb-2">
          <button class="btn btn-sm btn-outline-secondary" type="button" (click)="reset()">
            <i class="bi bi-arrow-counterclockwise me-1"></i>Reset to defaults
          </button>
        </div>

        @for (g of groups; track g) {
          <h6 class="text-uppercase text-muted small fw-bold mt-3 mb-2">{{ g }}</h6>
          <div class="row g-2">
            @for (ctrl of controlsFor(g); track ctrl.key) {
              <div class="col-12 col-sm-6 col-lg-4">
                @switch (ctrl.type) {
                  @case ('boolean') {
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        [id]="'pg-' + ctrl.key"
                        [checked]="c[ctrl.key]"
                        (change)="set(ctrl.key, $any($event.target).checked)"
                      />
                      <label class="form-check-label small" [for]="'pg-' + ctrl.key">
                        <code>{{ ctrl.key }}</code>
                      </label>
                    </div>
                  }
                  @case ('select') {
                    <label class="form-label small mb-0" [for]="'pg-' + ctrl.key"
                      ><code>{{ ctrl.key }}</code></label
                    >
                    <select
                      class="form-select form-select-sm"
                      [id]="'pg-' + ctrl.key"
                      (change)="setChoice(ctrl, $any($event.target).selectedIndex)"
                    >
                      @for (opt of ctrl.choices; track $index) {
                        <option [selected]="c[ctrl.key] === opt">{{ opt ?? '(none)' }}</option>
                      }
                    </select>
                  }
                  @case ('number') {
                    <label class="form-label small mb-0" [for]="'pg-' + ctrl.key"
                      ><code>{{ ctrl.key }}</code></label
                    >
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      [id]="'pg-' + ctrl.key"
                      [value]="c[ctrl.key] ?? ''"
                      placeholder="(none)"
                      (input)="setNumber(ctrl.key, $any($event.target).value)"
                    />
                  }
                  @default {
                    <label class="form-label small mb-0" [for]="'pg-' + ctrl.key"
                      ><code>{{ ctrl.key }}</code></label
                    >
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      [id]="'pg-' + ctrl.key"
                      [value]="c[ctrl.key] ?? ''"
                      placeholder="(none)"
                      (input)="setText(ctrl.key, $any($event.target).value)"
                    />
                  }
                }
              </div>
            }
          </div>
        }
      </app-example-card>
    </div>
  `,
})
export class PlaygroundDemoComponent {
  readonly cities = OBJECT_CITIES;
  readonly groupedCars = GROUPED_CARS;
  readonly groups = [...new Set(CONTROLS.map((c) => c.group))];

  config = signal<any>({ ...DEFAULTS });
  lastEvent = signal<string>('—');
  value: any = null;

  htmlSnippet = computed(() => {
    const c = this.config();
    const attrs = [
      c['group'] ? '[options]="groupedCars"' : '[options]="cities"',
      '[(ngModel)]="value"',
      c['group'] ? 'optionLabel="label"' : 'optionLabel="name"',
    ];
    for (const ctrl of CONTROLS) {
      const v = c[ctrl.key];
      if (v === DEFAULTS[ctrl.key] || v === undefined) continue;
      attrs.push(
        typeof v === 'string' ? `${ctrl.key}="${v}"` : `[${ctrl.key}]="${JSON.stringify(v)}"`,
      );
    }
    return `<ngb-select\n  ${attrs.join('\n  ')}\n></ngb-select>`;
  });

  controlsFor(group: string): PlaygroundControl[] {
    return CONTROLS.filter((c) => c.group === group);
  }

  set(key: string, val: any): void {
    if (key === 'multiple' || key === 'group') this.value = null;
    this.config.update((c) => ({ ...c, [key]: val }));
  }

  setChoice(ctrl: PlaygroundControl, index: number): void {
    this.set(ctrl.key, ctrl.choices![index]);
  }

  setNumber(key: string, raw: string): void {
    this.set(key, raw === '' ? undefined : Number(raw));
  }

  setText(key: string, raw: string): void {
    this.set(key, raw === '' ? undefined : raw);
  }

  log(name: string, payload?: unknown): void {
    this.lastEvent.set(payload === undefined ? name : `${name}: ${JSON.stringify(payload)}`);
  }

  reset(): void {
    this.value = null;
    this.config.set({ ...DEFAULTS });
    this.lastEvent.set('—');
  }
}
