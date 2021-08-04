import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioEditar } from '../_interfaces/EditarUser';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  updateForm : FormGroup;
  users = [];
  currentUser = null;

  userr;
  constructor(private userService: UserService,
    private authService: AuthService,
    private navCtrl: NavController, public router: Router,
    private formBuilder: FormBuilder, ) { 
    }

  datosUsuario: UsuarioEditar | any;
  editarForm = new FormGroup({
    PrimerNombre: new FormControl(''),
    SegundoNombre: new FormControl(''),
    PrimerApellido: new FormControl(''),
    SegundoApellido: new FormControl(''),
    nickname: new FormControl(''),
    email: new FormControl(''),
    estado: new FormControl(''),
  })

  async ngOnInit() {
    this.currentUser = await this.authService.stateUser();
   
    console.log(this.currentUser.uid);
    await this.userService.getUser(this.currentUser.uid).then((us) => {
      console.log(us);
      this.datosUsuario = us
    })
  

    this.userService.getUsers().on('value', (snapshot) => {
      this.users = [];
      snapshot.forEach((user) => {
        this.users.push({
          uid: user.key,
          ...user.val(),
        })
      })
    })

    this.editarForm.patchValue({
      'PrimerNombre': this.datosUsuario.PrimerNombre,
      'SegundoNombre': this.datosUsuario.SegundoNombre,
      'PrimerApellido': this.datosUsuario.PrimerApellido,
      'SegundoApellido': this.datosUsuario.SegundoApellido,
      'nickname': this.datosUsuario.nickname,
      'email': this.datosUsuario.email,
      'estado': this.datosUsuario.estado,
    })

    console.log(this.editarForm.value);
  }
  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }

 

  
  async postForm(form: UsuarioEditar) {
     this.currentUser = await this.authService.stateUser();
    console.log(form);
    this.userService.editarUsuario(this.currentUser.uid,form);
     
  }
    
}
