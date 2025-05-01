import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioDialogComponent } from './calendario-dialog.component';

describe('CalendarioDialogComponent', () => {
  let component: CalendarioDialogComponent;
  let fixture: ComponentFixture<CalendarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
