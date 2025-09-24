import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

/**
 * Guard that protects routes requiring authentication (any user)
 * Redirects to sign-in page if user is not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);

  if (adminAuthService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to sign-in with return URL
    router.navigate(['/sign-in'], { 
      queryParams: { 
        returnUrl: state.url 
      }
    });
    return false;
  }
};