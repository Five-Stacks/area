import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { map } from 'rxjs';

/**
 * Guard that protects routes requiring authentication (any user)
 * Redirects to sign-in page if user is not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);

  return adminAuthService.isAuthenticated().pipe(
    // If authenticated, allow activation; otherwise, redirect
    // Import 'map' from 'rxjs/operators' if not already imported
    map(isAuth => {
      if (isAuth) {
        return true;
      } else {
        return router.createUrlTree(['/sign-in'], {
          queryParams: { returnUrl: state.url }
        });
      }
    })
  );
};