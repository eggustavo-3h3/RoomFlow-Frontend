import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { perfilGuard } from './perfil.guard';

describe('perfilGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => perfilGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
