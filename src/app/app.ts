import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbSelectComponent } from '../lib/ngb-select.component';
import { SelectOption } from '../lib/ngb-select.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbSelectComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // 1. Basic
  cities: SelectOption[] = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Tokyo', value: 'TOK' }
  ];
  selectedCity: string = 'NY';

  // 2. Reactive Forms
  userForm = new FormGroup({
    country: new FormControl<string | null>(null, [Validators.required])
  });

  countries = [
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    { name: 'France', code: 'FR', flag: '🇫🇷' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵' },
    { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' }
  ];

  // 3. Filtering & Match Modes
  selectedCountryWithFilter: string | null = null;
  filterMode: any = 'contains';

  // 4. Custom Templates
  technologies = [
    { name: 'Angular', type: 'Frontend', icon: 'bi-gem', badge: 'v19' },
    { name: 'Bootstrap', type: 'CSS Framework', icon: 'bi-bootstrap-fill', badge: 'v5.3' },
    { name: 'TypeScript', type: 'Language', icon: 'bi-code-slash', badge: 'v5.6' },
    { name: 'Node.js', type: 'Backend', icon: 'bi-hdd-network', badge: 'v22' }
  ];
  selectedTech: any = this.technologies[0];

  // 5. Grouping
  groupedCars = [
    {
      brand: 'Germany',
      cars: [
        { name: 'BMW', value: 'bmw' },
        { name: 'Mercedes-Benz', value: 'mercedes' },
        { name: 'Audi', value: 'audi' }
      ]
    },
    {
      brand: 'Japan',
      cars: [
        { name: 'Toyota', value: 'toyota' },
        { name: 'Honda', value: 'honda' },
        { name: 'Nissan', value: 'nissan' }
      ]
    },
    {
      brand: 'USA',
      cars: [
        { name: 'Tesla', value: 'tesla' },
        { name: 'Ford', value: 'ford' }
      ]
    }
  ];
  selectedCar: string | null = null;

  // 6. Sizes & Variants
  selectedSizeCity: string = 'RM';

  // 7. Float Label
  selectedFloatCity: string | null = null;

  // 8. Focus on Open & Editable
  editableValue: string = 'Custom Initial Value';
  focusIndexCity: string | null = null;

  // 9. Angular Signals
  signalCity = signal<string>('TOK');

  // Helper
  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      alert('Form submitted successfully: ' + JSON.stringify(this.userForm.value));
    }
  }
}
