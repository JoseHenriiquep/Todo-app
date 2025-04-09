import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    return false;
  }
};
