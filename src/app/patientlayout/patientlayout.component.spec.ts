import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlayoutComponent } from './patientlayout.component';

describe('PatientlayoutComponent', () => {
  let component: PatientlayoutComponent;
  let fixture: ComponentFixture<PatientlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
