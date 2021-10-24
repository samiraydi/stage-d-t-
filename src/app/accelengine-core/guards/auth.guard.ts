import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Services
import { AuthenticationService } from '../services/authentication.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isTokenExpired()) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.authenticationService.logout(false);
        this.router.navigate([APP_CONFIG.app.loginPage], { queryParams: { returnUrl: state.url } });
        return false;
    }
}