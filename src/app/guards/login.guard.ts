import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storage: Storage, private navCtrl: NavController,
    private authService: AuthService) { }

  async canActivate()
  {
    try{
      const user = await this.authService.stateUser();
      if(user){
        this.navCtrl.navigateRoot('/home');
      }else{
        return true;
      }
    }catch (error){
      return true;
    }
  }
  
}
