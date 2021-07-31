import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PelisDetailsPageRoutingModule } from './pelis-details-routing.module';

import { PelisDetailsPage } from './pelis-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PelisDetailsPageRoutingModule
  ],
  declarations: [PelisDetailsPage]
})
export class PelisDetailsPageModule {}
