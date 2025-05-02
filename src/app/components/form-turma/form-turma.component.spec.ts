import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTurmaComponent } from './form-turma.component';

describe('FormTurmaComponent', () => {
  let component: FormTurmaComponent;
  let fixture: ComponentFixture<FormTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTurmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
