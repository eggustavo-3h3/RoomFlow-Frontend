import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSalaComponent } from './cards-sala.component';

describe('CardsSalaComponent', () => {
  let component: CardsSalaComponent;
  let fixture: ComponentFixture<CardsSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
