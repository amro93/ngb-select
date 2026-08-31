# Installation Guide

This guide provides step-by-step instructions on how to install and configure the `ngb-select` component in your Angular project.

## Prerequisites

Before installing `ngb-select`, ensure your project meets the following requirements:
- Angular 15 or higher (the component is built as a Standalone Component).
- Bootstrap 5 CSS (the component uses pure Bootstrap 5 classes).

## 1. Install the Package

Install the library and its peer dependencies via NPM:

```bash
npm install ngb-select bootstrap bootstrap-icons
```

> **Note:** `bootstrap` and `bootstrap-icons` are required for the component's styling and default icons (caret, clear button, etc.).

## 2. Configure Styles

You need to include Bootstrap's CSS and Bootstrap Icons in your project. There are two primary ways to do this in an Angular CLI project:

### Option A: Using `angular.json`

Open your `angular.json` file and add the paths to the `styles` array of your application's build target:

```json
"architect": {
  "build": {
    "options": {
      "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/bootstrap-icons/font/bootstrap-icons.css",
        "src/styles.scss"
      ]
    }
  }
}
```

### Option B: Using `src/styles.scss` (Recommended)

If you are using SCSS, you can import the Bootstrap styles directly into your global `styles.scss` file. This approach is often preferred as it allows you to customize Bootstrap variables if needed:

```scss
// Import Bootstrap CSS
@import 'bootstrap/scss/bootstrap';

// Import Bootstrap Icons
@import 'bootstrap-icons/font/bootstrap-icons.css';
```

## 3. Import the Component

Since `ngb-select` is a Standalone Component, you do not need to import it into a traditional `NgModule` (unless your app still heavily relies on them). You can import it directly into your standalone components.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbSelectComponent } from 'ngb-select';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [NgbSelectComponent, FormsModule], // Import the component here
  template: `
    <ngb-select
      [options]="myOptions"
      [(ngModel)]="selectedValue"
      optionLabel="label"
      optionValue="value"
      placeholder="Select an option">
    </ngb-select>
  `
})
export class MyComponent {
  myOptions = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }
  ];
  selectedValue: number;
}
```

## 4. (Optional) Reactive Forms

If you are using Reactive Forms (`formControlName` or `[formControl]`), make sure to also import `ReactiveFormsModule`:

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgbSelectComponent } from 'ngb-select';

@Component({
  selector: 'app-my-reactive-form',
  standalone: true,
  imports: [NgbSelectComponent, ReactiveFormsModule],
  template: `
    <ngb-select
      [options]="myOptions"
      [formControl]="myControl"
      optionLabel="label"
      optionValue="value">
    </ngb-select>
  `
})
export class MyReactiveFormComponent {
  myControl = new FormControl(null);
  myOptions = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 }
  ];
}
```

## Next Steps

Now that you have successfully installed and configured `ngb-select`, check out the [Demo Examples Catalog](./07-demo-examples.md) to see the component in action, or read the [API & Interfaces documentation](./02-api-and-interfaces.md) to explore all available inputs, outputs, and customization options.
