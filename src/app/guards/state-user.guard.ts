import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StateUserGuard implements CanActivate {
  constructor(private authService: AuthService, private navCtrl: NavController){}
  
  
async  canActivate(){
  try{
    const user = await this.authService.stateUser();
    if (user){
      return true;
    }else {
      this.navCtrl.navigateRoot('/login');
    }
  }catch(error){
    this.navCtrl.navigateRoot('/login');
  }
  }
    
  }
  

