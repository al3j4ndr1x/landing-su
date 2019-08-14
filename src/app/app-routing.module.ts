import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    // loadChildren: './auth/auth.module#AuthModule', // Custom Auth comp
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), // Custom Auth comp
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AngularFireAuthGuard], // here we tell Angular to check the access with our AngularFireAuthGuard
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
