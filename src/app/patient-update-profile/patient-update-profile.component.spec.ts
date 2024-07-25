import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateProfileComponent } from './patient-update-profile.component';

describe('PatientUpdateProfileComponent', () => {
  let component: PatientUpdateProfileComponent;
  let fixture: ComponentFixture<PatientUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientUpdateProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
