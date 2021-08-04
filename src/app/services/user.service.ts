import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database'
import {UsuarioEditar} from '../_interfaces/EditarUser'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  db: firebase.database.Database;

  constructor() { 
    this.db = firebase.database();
  }

  getUsers(){
    return this.db.ref('userss');
  }

  getUser(uid){
    return new Promise((resolve, reject) => {
      this.db.ref(`userss/${uid}`).on('value', (snapshot) => {
        resolve({
          uid: snapshot.key,
          ...snapshot.val(),
        });

      })
    })
  }

  editarUsuario(id: string, usuario: UsuarioEditar) {
    return this.db.ref(`userss/${id}`).update(usuario)
  }
}
