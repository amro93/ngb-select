import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbSelectComponent } from './ngb-select.component';

describe('NgbSelectComponent Signals & Computations', () => {
  let fixture: ComponentFixture<NgbSelectComponent>;
  let component: NgbSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgbSelectComponent);
    component = fixture.componentInstance;
    // We don't call fixture.detectChanges() here automatically to allow input setting
  });

  it('should compute safeOptions correctly', () => {
    fixture.componentRef.setInput('options', null);
    fixture.detectChanges();
    expect(component.safeOptions()).toEqual([]);

    fixture.componentRef.setInput('options', [{ id: 1 }]);
    fixture.detectChanges();
    expect(component.safeOptions()).toEqual([{ id: 1 }]);
  });

  it('should compute effectiveSearchPlaceholder based on priority', () => {
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Search...');

    fixture.componentRef.setInput('placeholder', 'Base');
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Base');

    fixture.componentRef.setInput('filterPlaceholder', 'Filter');
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Filter');

    fixture.componentRef.setInput('searchPlaceholder', 'Search');
    fixture.detectChanges();
    expect(component.effectiveSearchPlaceholder()).toBe('Search');
  });

  it('should compute hasSelectedValue correctly for single mode', () => {
    fixture.componentRef.setInput('multiple', false);
    fixture.detectChanges();
    
    expect(component.hasSelectedValue()).toBe(false);
    
    component.value.set('A');
    expect(component.hasSelectedValue()).toBe(true);

    component.value.set('');
    expect(component.hasSelectedValue()).toBe(false);
    
    component.value.set(null);
    expect(component.hasSelectedValue()).toBe(false);
  });

  it('should compute hasSelectedValue correctly for multiple mode', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    
    expect(component.hasSelectedValue()).toBe(false);
    
    component.value.set(['A']);
    expect(component.hasSelectedValue()).toBe(true);

    component.value.set([]);
    expect(component.hasSelectedValue()).toBe(false);
    
    component.value.set(null);
    expect(component.hasSelectedValue()).toBe(false);
  });
  
  it('should handle overlayVisible model two-way binding naturally', () => {
    fixture.detectChanges();
    
    expect(component.overlayVisible()).toBe(false);
    
    // Setting internally reflects in the model
    component.openOverlay();
    expect(component.overlayVisible()).toBe(true);
    
    component.closeOverlay();
    expect(component.overlayVisible()).toBe(false);
    
    // Setting externally sets the signal
    fixture.componentRef.setInput('overlayVisible', true);
    fixture.detectChanges();
    expect(component.overlayVisible()).toBe(true);
  });
});
