import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/database'
import { promise } from 'protractor';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(public storage: Storage) { }

  async register(PrimerNombre: string, SegundoNombre: string, PrimerApellido: string, SegundoApellido: string,
    nickname: string, email: string, password: string, estado: string){
    const credencial:firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
    const user: firebase.User = firebase.auth().currentUser;

    user.updateProfile({
      displayName: nickname
    });

    firebase.database().ref(`userss/${user.uid}`).set({
      PrimerNombre,
      SegundoNombre,
      PrimerApellido,
      SegundoApellido,
      nickname,
      email,
      estado,
    })
    return user;
  }

  async updateUser(PrimerNombre: string, SegundoNombre: string, PrimerApellido: string, SegundoApellido: string,
    nickname: string, email: string, password: string, estado: string){
    const user: firebase.User = firebase.auth().currentUser;

    user.updateProfile({
      displayName: nickname
    });

    firebase.database().ref(`userss/${user.uid}`).set({
      PrimerNombre,
      SegundoNombre,
      PrimerApellido,
      SegundoApellido,
      nickname,
      email,
      estado,
    })
    return user;
  }
  async login(email: string, password: string): Promise<firebase.User>{
    const credencial:firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  const user: firebase.User = firebase.auth().currentUser;
  return credencial.user;
  }

  stateUser = () =>
    new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
          
        } else {
          reject(null);
        }
      });
    });

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('isIntroShowed');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }


}
