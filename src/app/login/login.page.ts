import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {UsuarioEditar} from '../_interfaces/EditarUser'

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;  //contiene el formulario
  currentUser = null;


  constructor(private serviceLogin: AuthService, private navCtrl: NavController,
    public alertController: AlertController, private authService: AuthService,
    private userService: UserService ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
   }


  datosUsuario: UsuarioEditar | any;
  EstadoForm = new FormGroup({
    estado: new FormControl(''),
  })
  
  ngOnInit() {
 
  }

  async loginUser() {
    if (this.loginForm.valid) {
      //implementacion
      const {  email, password } = this.loginForm.value;
      const user = await this.serviceLogin.login(email, password);
      console.log(user);
      this.navCtrl.navigateRoot('/menu');
    }

  }
  async estadoUpdate(form: UsuarioEditar) {
    this.currentUser = await this.authService.stateUser();
    console.log(form);
    this.userService.editarUsuario(this.currentUser.uid, form);

  }
  
  
}
