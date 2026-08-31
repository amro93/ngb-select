import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_VERSION } from '../version';
import { COUNTRIES, Country } from './data/demo-data';
import { NavbarComponent } from './components/navbar.component';
import { HeroSectionComponent } from './components/hero-section.component';
import { SidebarNavComponent } from './components/sidebar-nav.component';
import { ShowcaseDemosComponent } from './components/showcase-demos.component';
import { ApiReferenceComponent } from './components/api-reference.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroSectionComponent,
    SidebarNavComponent,
    ShowcaseDemosComponent,
    ApiReferenceComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public readonly appVersion = APP_VERSION;
  isDarkMode = false;

  countries: Country[] = COUNTRIES;
  selectedHeroCountries: Country[] = [];

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
