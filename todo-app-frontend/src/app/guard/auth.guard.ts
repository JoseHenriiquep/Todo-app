import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true 
  } else {
    return false;
  }
};
