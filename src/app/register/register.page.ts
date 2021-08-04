import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  registerForm: FormGroup;  //contiene el formulario
  registerFormMessage = {
    nickname: [
      {type: 'required', message: 'El Nickname es obligatorio!'},
      { type: 'minlength', message: 'El Nickname debe ser de minimo 5 caracteres!' } 
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio!' },
      { type: 'email', message: 'Este valor debe ser un email!' }
    ]
  }

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.buildForm();
  }

 
  //fncion para registrar
  async registerUser(){
   var estado = "Desconectado";
    if(this.registerForm.valid){
      //implementacion
      const {PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, nickname, email, password} = this.registerForm.value;
      const user = await this.authService.register(PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,nickname, email, password, estado);
      console.log(user);
      this.navCtrl.navigateRoot('/login');
    }
  }
  //funcion que construya el formularop
  private buildForm(){
    this.registerForm = this.formBuilder.group({
      PrimerNombre: ['', [Validators.required, Validators.minLength(4)]],
      SegundoNombre: ['', [Validators.required, Validators.minLength(4)]],
      PrimerApellido: ['', [Validators.required, Validators.minLength(4)]],
      SegundoApellido: ['', [Validators.required, Validators.minLength(4)]],
      nickname: ['', [Validators.required,Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(2)]]
    })
  }


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Aviso!',
      subHeader: 'Cuenta creada',
      message: 'Inicie sesion.',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
