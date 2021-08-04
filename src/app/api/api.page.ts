import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ChatsService } from '../services/chats.service';
import { conversation } from '../_interfaces/user';


@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  friend;
  chatId;
  conversations;
  conversation: conversation = {} as conversation;
  constructor(private navCtrl: NavController,private serviceApi: ApiService,
     private authService: AuthService,
     private chatsService: ChatsService) { }
  usuarios: Array<any> = [];
  currentUser = null;
  async ngOnInit() {
    this.currentUser = await this.authService.stateUser();

    this.serviceApi.getCharacters().then(data => {
      this.usuarios = data.results
      var id = data.results.mal_id
      console.log(id);
    });
    this.chatId = [this.currentUser.uid].sort().join('|');
    
    this.chatsService.getChat(this.chatId).on('value', (snapshot) => {
      this.conversations = [];
      snapshot.forEach((conversation) => {
        this.conversations.push(conversation.val());
      })
    })
  }
  isFavorite = false;
  async sendMessage(uid: object) {
    if (uid != null){ 
    console.log(uid);
      this.conversation.uid = this.chatId;
      this.conversation.sender = this.currentUser.uid;
      this.conversation.text = uid;
      this.conversation.timestamp = Date.now();
      this.isFavorite = true;
      await this.serviceApi.create(this.conversation);
    }else{
      this.isFavorite = false;
    }
  }

  }


