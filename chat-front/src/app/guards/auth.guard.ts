import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    public canActivate(): boolean {
        if (this.authService.isLogged) return true;

        this.router.navigate(['/']);
        return false;
    }
}
