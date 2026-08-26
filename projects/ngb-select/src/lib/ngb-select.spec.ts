import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbSelect } from './ngb-select';

describe('NgbSelect', () => {
  let component: NgbSelect;
  let fixture: ComponentFixture<NgbSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(NgbSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
