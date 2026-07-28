import { TestBed } from '@angular/core/testing';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { pendingChangesGuard, CanExit } from './pending-changes-guard';

describe('pendingChangesGuard', () => {
  it('should allow navigation when canExit returns true', () => {
    const component: CanExit = {
      canExit: () => true,
    };

    const result = TestBed.runInInjectionContext(() =>
      pendingChangesGuard(
        component,
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
  });

  it('should block navigation when canExit returns false', () => {
    const component: CanExit = {
      canExit: () => false,
    };

    const result = TestBed.runInInjectionContext(() =>
      pendingChangesGuard(
        component,
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(false);
  });
});
