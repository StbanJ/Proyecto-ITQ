
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { conversation} from '../_interfaces/user'
import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/database'

import {UsuarioEditar} from '../_interfaces/EditarUser'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
db: firebase.database.Database
  constructor(private http: HttpClient, public storage: Storage) {
    this.db = firebase.database();
   }

  URL: string = 'https://api.jikan.moe/v3/search/anime?q=One%20piece';

  getCharacters = () => fetch(this.URL).then((response) => response.json())


  async create(conversation: conversation) {
    await this.db.ref(`favorite/${conversation.uid}/${conversation.timestamp}`).set(conversation);
  }

  getChat(uid) {
    return this.db.ref(`favorite/${uid}`);
  }
  delete_api(id, uid){
   
    return this.db.ref(`favorite/${id}/${uid}`).remove();
    console.log("eliminado");
    
  }


}
