import { CanDeactivateFn } from '@angular/router';

export interface CanExit {
  canExit: () => boolean;
}

export const pendingChangesGuard: CanDeactivateFn<CanExit> = (component) => {
  return component.canExit();
};
