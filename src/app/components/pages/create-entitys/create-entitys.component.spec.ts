import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntitysComponent } from './create-entitys.component';

describe('CreateEntitysComponent', () => {
  let component: CreateEntitysComponent;
  let fixture: ComponentFixture<CreateEntitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntitysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
