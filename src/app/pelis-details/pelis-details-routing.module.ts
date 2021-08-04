import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PelisDetailsPage } from './pelis-details.page';

const routes: Routes = [
  {
    path: '',
    component: PelisDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PelisDetailsPageRoutingModule {}
