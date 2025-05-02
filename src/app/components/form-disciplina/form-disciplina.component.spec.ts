import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDisciplinaComponent } from './form-disciplina.component';

describe('FormDisciplinaComponent', () => {
  let component: FormDisciplinaComponent;
  let fixture: ComponentFixture<FormDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDisciplinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
