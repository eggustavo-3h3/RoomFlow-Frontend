import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCursoComponent } from './form-curso.component';

describe('FormCursoComponent', () => {
  let component: FormCursoComponent;
  let fixture: ComponentFixture<FormCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
