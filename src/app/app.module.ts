import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import {
  NbThemeModule,
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbUserModule,
  NbMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbToastrModule,
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    // Enable Offline Data in AngularFirestore
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AppRoutingModule,
    HttpClientModule, // Auth module utilizes features of HttpClientModule
    // this will enable the default theme, you can change this by passing
    // `{ name: 'dark' }` to enable the dark theme
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(), // if this is your app.module
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbAlertModule,
    NbCheckboxModule,
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          // email is an alias we've assigned to the strategy so that we can dynamically mention it later
          name: 'email', // strategy id key.
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0, // delay before redirect after a successful login, while success message is shown to the user
          redirect: {
            success: '/profile/',
            failure: null, // stay on the same page
          }
        },
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard, AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
