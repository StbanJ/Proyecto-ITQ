import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };
  constructor(private camera: Camera, private storageService: StorageService) { }

  ngOnInit() { 
  }

  async getPicture(source: string) {
    this.cameraOptions.sourceType = source === 'camera' 
    ? this.camera.PictureSourceType.CAMERA 
    : this.camera.PictureSourceType.PHOTOLIBRARY;

    const imageData = await this.camera.getPicture(this.cameraOptions);
    const imageBase64 = `data:image/jpeg;base64,${imageData}`;
    this.storageService.saveImage(`${Date.now()}`, imageBase64)
    .then(() => {
      console.log("subida");
    }).catch((error) => {
      console.log(error);
    });
  }
}
