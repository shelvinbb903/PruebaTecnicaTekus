import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
    await this.usersService.loadDataSession();

    if(JSON.stringify(this.usersService.dataUserLogin) !== '{}') {
      this.router.navigate(["listSubscribers"])
      return false;  
    }
    return true;
  }
  
}
