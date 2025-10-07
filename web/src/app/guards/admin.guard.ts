import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AdminAuthService } from '../services/admin-auth.service';

/**
 * Guard that protects routes requiring admin privileges
 * Redirects to sign-in page if user is not authenticated
 * Redirects to error page if user is authenticated but not admin
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);

  return adminAuthService.isAdmin().pipe(
    take(1),
    map(isAdmin => {
      if (isAdmin) {
        return true;
      }

      // Check if user is authenticated but not admin
      if (adminAuthService.isAuthenticated()) {
        // User is logged in but not admin - redirect to error page
        router.navigate(['/error'], {
          queryParams: {
            message: 'Access denied. Admin privileges required.'
          }
        });
        return false;
      } else {
        // User is not authenticated - redirect to sign-in
        router.navigate(['/sign-in'], {
          queryParams: {
            returnUrl: state.url
          }
        });
        return false;
      }
    })
  );
};