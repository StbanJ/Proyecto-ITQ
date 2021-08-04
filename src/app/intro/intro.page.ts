import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
 
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private navCtrl: NavController, 
    private storage: Storage, private router: Router ) { }

  ngOnInit() {
  }

  async finishIntro(){
    await this.storage.set('isIntroShowed', true);
    this.navCtrl.navigateRoot('/menu');
    //this.router.navigateByUrl('/home');
  }
}
