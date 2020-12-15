import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

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
  NbIconModule,
  NbMenuModule,
  NbDatepickerModule,
  NbContextMenuModule,
  NbActionsModule,
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

import { NbDateFnsDateModule } from '@nebular/date-fns';

import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import localeClExtra from '@angular/common/locales/extra/es-CL';
// the second parameter 'es-CL' is optional
registerLocaleData(localeCl, 'es-CL', localeClExtra);

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbContextMenuModule,
    NbActionsModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      format: 'dd-MM-yyyy'
    }),
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
  providers: [AuthGuard, AngularFireAuthGuard, {provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
