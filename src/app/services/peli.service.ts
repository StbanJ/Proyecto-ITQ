import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPelis } from '../models/IPelis.interface';
import { conversation} from '../_interfaces/user';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PeliService {
  private url: string = '';

  db: firebase.database.Database
  constructor(private http: HttpClient, public storage: Storage) {
    this.db = firebase.database();
   }

  searchMovies(title: string, type: string){
    this.url = `http://www.omdbapi.com/?s=${encodeURI(title)}&type=${type}&apikey=d84c07af`;
    console.log(this.url);
    return this.http.get<IPelis>(this.url).pipe(map(results => results['Search']));
  }

  getDetails(id: string){
    return this.http.get<IPelis>(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=d84c07af`);
  }
  async create(conversation: conversation) {
    await this.db.ref(`favorite/${conversation.uid}/${conversation.timestamp}`).set(conversation);
  } 
}
