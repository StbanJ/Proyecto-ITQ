import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliService } from 'src/app/services/peli.service';
import { IPelis } from 'src/app/models/IPelis.interface';
import { AuthService } from '../services/auth.service';
import { ChatsService } from '../services/chats.service';
import { conversation } from '../_interfaces/user';

@Component({
  selector: 'app-pelis',
  templateUrl: './pelis.page.html',
  styleUrls: ['./pelis.page.scss'],
})
export class PelisPage implements OnInit {
results: Observable<IPelis>;
term: string = '';
type: string = '';

chatId;
conversations;
conversation: conversation = {} as conversation;
currentUser = null;

  constructor(
    private peliService: PeliService,
    private authService: AuthService,
     private chatsService: ChatsService,
     private serviceapi: PeliService) { }
  
  async ngOnInit() {
    this.currentUser = await this.authService.stateUser();

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
      await this.serviceapi.create(this.conversation);
    }else{
      this.isFavorite = false;
    }
  }

  searchChanged():void{
    this.results = this.peliService.searchMovies(this.term,this.type);
  }
}
