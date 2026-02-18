import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConfirmedComponent } from './get-confirmed.component';

describe('GetConfirmedComponent', () => {
  let component: GetConfirmedComponent;
  let fixture: ComponentFixture<GetConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetConfirmedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
