import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  users = [];
  currentUser = null;
  constructor(private route: ActivatedRoute,
    private navCtrl: NavController, private serviceApi: ApiService,
    private authService: AuthService,
    private chatsService: ChatsService) { }

 async ngOnInit() {
   this.currentUser = await this.authService.stateUser();
   
  console.log(this.currentUser);
   this.serviceApi.getChat(this.currentUser.uid).on('value', (snapshot) => {
     this.users = [];
     snapshot.forEach((user) => {
       this.users.push({
         uid: user.key,
         ...user.val(),
       })
     })
     console.log(this.users);
   })
  }


   async Eliminar(uid){
    this.currentUser = await this.authService.stateUser();
     this.serviceApi.delete_api(this.currentUser.uid, uid);
 console.log(uid);
  }
}
