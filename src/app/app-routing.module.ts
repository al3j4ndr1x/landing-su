import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
// import {
//   AngularFireAuthGuard,
//   hasCustomClaim,
//   redirectUnauthorizedTo,
//   redirectLoggedInTo,
//   canActivate
// } from '@angular/fire/auth-guard';

// const adminOnly = hasCustomClaim('admin');
// const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth/login']);
// const redirectLoggedInToLanding = redirectLoggedInTo(['/']);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), // Custom Auth comp
  },
  {
    path: 'profile',
    // component: ProfileComponent,
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    // canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    // canActivate: [AngularFireAuthGuard], // here we tell Angular to check the access with our AngularFireAuthGuard
    // data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
