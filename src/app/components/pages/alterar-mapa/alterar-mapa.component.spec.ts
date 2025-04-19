import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarMapaComponent } from './alterar-mapa.component';

describe('AlterarMapaComponent', () => {
  let component: AlterarMapaComponent;
  let fixture: ComponentFixture<AlterarMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
