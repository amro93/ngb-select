import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDemosComponent } from './demos/basic-demos.component';
import { FeaturesDemosComponent } from './demos/features-demos.component';
import { AdvancedDemosComponent } from './demos/advanced-demos.component';

@Component({
  selector: 'app-showcase-demos',
  standalone: true,
  imports: [CommonModule, BasicDemosComponent, FeaturesDemosComponent, AdvancedDemosComponent],
  template: `
    <div class="row g-4">
      <!-- 1-8: Basic, Multi-select, Reactive forms, Filtering, Focus on open -->
      <app-basic-demos></app-basic-demos>

      <!-- 9-16: Templates, Grouping, Editable, Floating labels, Sizes, Loading, Virtual scroll, Signals -->
      <app-features-demos></app-features-demos>

      <!-- 17-28: Arabic RTL, Cascading, Async, Custom icons, Table edit, Modal, Dark mode, A11y, Form reset, Grouped multi, Mobile modal -->
      <app-advanced-demos></app-advanced-demos>
    </div>
  `,
})
export class ShowcaseDemosComponent {}
