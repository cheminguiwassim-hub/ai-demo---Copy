import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('token');
    if (!token) {
      // redirect to login but keep user on home if they came from there
      this.router.navigate(['/pages/login'], { queryParams: { redirectTo: this.router.url }});
      return false;
    }
    return true;
  }
}
