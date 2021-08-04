import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: firebase.storage.Storage;
  constructor() { 
    this.storage = firebase.storage();
  }

  saveImage(imageName, base64File){
    const imageRef = this.storage.ref().child(`${imageName}.jpeg`);
    return imageRef.putString(base64File, 'data_url');
  }
}
