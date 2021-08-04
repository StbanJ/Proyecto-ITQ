import { TestBed } from '@angular/core/testing';

import { StateUserGuard } from './state-user.guard';

describe('StateUserGuard', () => {
  let guard: StateUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StateUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
