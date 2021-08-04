import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule),

  },

  
  {
    path: '',
    component: MenuPage,
    
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      
     
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),

      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryPageModule)
      },
      {
        path: 'api',
        loadChildren: () => import('../api/api.module').then(m => m.ApiPageModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../cuenta/cuenta.module').then(m => m.CuentaPageModule)
      },
      {
        path: 'favorite',
        loadChildren: () => import('../favorite/favorite.module').then(m => m.FavoritePageModule)
      },
      {
        path: 'pelis',
        loadChildren: () => import('../pelis/pelis.module').then( m => m.PelisPageModule)
      },
      {
        path: 'peli/:id',
        loadChildren: () => import('../pelis-details/pelis-details.module').then( m => m.PelisDetailsPageModule)
      },
      
    ]
  }, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
