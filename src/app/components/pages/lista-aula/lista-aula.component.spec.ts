import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAulaComponent } from './lista-aula.component';

describe('ListaAulaComponent', () => {
  let component: ListaAulaComponent;
  let fixture: ComponentFixture<ListaAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAulaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
