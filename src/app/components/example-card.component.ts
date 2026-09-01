import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card example-card" [ngClass]="cardClass">
      <div
        class="card-header d-flex align-items-center justify-content-between p-3"
        [ngClass]="headerClass"
      >
        <span>
          <i [class]="icon" [ngClass]="iconClass + ' me-2'"></i>
          <span [ngClass]="titleClass">{{ title }}</span>
        </span>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <button
              class="nav-link"
              [class.active]="activeTab() === 'demo'"
              (click)="setTab('demo')"
            >
              Demo
            </button>
          </li>
          @if (htmlCode) {
            <li class="nav-item">
              <button
                class="nav-link"
                [class.active]="activeTab() === 'html'"
                (click)="setTab('html')"
              >
                HTML
              </button>
            </li>
          }
          @if (tsCode) {
            <li class="nav-item">
              <button class="nav-link" [class.active]="activeTab() === 'ts'" (click)="setTab('ts')">
                TS
              </button>
            </li>
          }
        </ul>
      </div>
      <div class="card-body p-3">
        @if (activeTab() === 'demo') {
          <ng-content></ng-content>
        }

        @if (activeTab() === 'html' && htmlCode) {
          <div class="position-relative">
            <button
              class="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2"
              (click)="copyCode(htmlCode, 'html')"
            >
              <i
                class="bi"
                [class.bi-clipboard]="copiedType() !== 'html'"
                [class.bi-check-lg]="copiedType() === 'html'"
              ></i>
            </button>
            <pre class="code-box m-0"><code>{{ htmlCode }}</code></pre>
          </div>
        }

        @if (activeTab() === 'ts' && tsCode) {
          <div class="position-relative">
            <button
              class="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2"
              (click)="copyCode(tsCode, 'ts')"
            >
              <i
                class="bi"
                [class.bi-clipboard]="copiedType() !== 'ts'"
                [class.bi-check-lg]="copiedType() === 'ts'"
              ></i>
            </button>
            <pre class="code-box m-0"><code>{{ tsCode }}</code></pre>
          </div>
        }
      </div>
    </div>
  `,
})
export class ExampleCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) icon!: string;
  @Input() iconClass: string = 'text-primary';
  @Input() titleClass: string = '';
  @Input() cardClass: string = '';
  @Input() headerClass: string = '';
  @Input() htmlCode?: string;
  @Input() tsCode?: string;

  activeTab = signal<'demo' | 'html' | 'ts'>('demo');
  copiedType = signal<'html' | 'ts' | null>(null);

  setTab(tab: 'demo' | 'html' | 'ts'): void {
    this.activeTab.set(tab);
  }

  copyCode(code: string, type: 'html' | 'ts'): void {
    navigator.clipboard.writeText(code);
    this.copiedType.set(type);
    setTimeout(() => {
      this.copiedType.set(null);
    }, 2000);
  }
}
