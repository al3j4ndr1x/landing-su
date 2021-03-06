/* istanbul ignore file */

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { User } from './model/user.model'; // optional
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  private userClaims: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    ) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // logged in, get custom user from Firestore
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // logged out, null
          return of(null);
        }
      })
    );

    // this.onAuthStateChanged();
    // this.onIdTokenChanged();
  }

  public get isAuthenticated(): boolean {
    return !!this.afAuth.authState;
  }
  // public get isAuthenticated$(): Observable<boolean> {
  //   return this.afAuth.authState.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         // logged in, get custom user from Firestore
  //         return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
  //       } else {
  //         // logged out, null
  //         return of(null);
  //       }
  //     })
  //   );
  // }

  // @angular/fire provides an authState Observable which is great for reacting to
  // realtime changes to the user’s login state. However, it can be useful to also
  // return this value as a Promise for one-off operations and for use with async/await.
  // Let’s say we have an auth service using Firebase. We can take the first() emitted value
  // from the stream, then convert it using toPromise()
  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // Email/Password Auth Sign Up
  async emailSignUp(email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      // this.notify.update('Welcome new user!', 'success');
      return await this.updateUserData(credential.user); // if using firestore
    } catch (error) {
      return this.handleError(error);
    }
  }

  async emailLogin(email: string, password: string, rememberMe: boolean) {
    try {
      if (rememberMe) {
        const credential = await this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
          .then(() =>
            // Indica que el estado persistirá incluso cuando se cierre la ventana del navegador
            // o se anule la actividad. Se debe salir de la cuenta de forma explícita para desactivar ese estado.
            // New sign-in will be persisted with Local persistence.
            this.afAuth.signInWithEmailAndPassword(email, password)
          )
          .catch((error) => {
            throw error;
            // return this.handleError(error);
          })
          .finally(() => {
            // return this.updateUserData(credential.user);
          });

        return this.updateUserData(credential.user);

      } else {
        const credential = await this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.SESSION)
          .then(() =>
            // SESSION Indica que el estado solo persistirá en la sesión o pestaña actual
            // y se desactivará cuando se cierre la pestaña o ventana en la que el usuario está autenticado.
            // New sign-in will be persisted with Session persistence.
            this.afAuth.signInWithEmailAndPassword(email, password)
          )
          .catch((error) => {
            throw error;
            // return this.handleError(error);
          })
          .finally(() => {
            // return this.updateUserData(credential.user);
          });

        return this.updateUserData(credential.user);
      }

      // this.notify.update('Welcome back!', 'success');
    } catch (error) {
      return this.handleError(error);
    }
  }

  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/auth/login']);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }

  public get currentUser(): any {
    return this.afAuth.currentUser;
  }

  public get getUserClaims(): any {
    return this.userClaims;
  }

  private onIdTokenChanged() {
    this.afAuth.onIdTokenChanged(user => {
      this.setUserClaims(user);
    });
  }

  private onAuthStateChanged() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.setUserClaims(user);
      } else {
        console.log('logged out');
      }
      // Custom function call
      // this.setCustomAppState(user);
    });
  }

  // Custom function definition example
  private setCustomAppState(user: firebase.default.User) {
    const loggedOutRoute = '/login';
    if (user) {
      if (user.emailVerified) {
        this.setCustomAppRoute('/');
      } else {
        this.setCustomAppRoute(loggedOutRoute);
      }
    } else {
      this.setCustomAppRoute(loggedOutRoute);
    }
  }

  // Custom function definition example
  private setCustomAppRoute(route: string) {
    this.ngZone.run(() => {
      this.router.navigate([route]);
    });
  }

  private setUserClaims(user: firebase.default.User) {
    user.getIdTokenResult().then(idTokenResult => {
      this.userClaims = idTokenResult.claims;
    });
  }

  // If error, console log and notify user
  /* istanbul ignore next */
  private handleError(error: firebase.default.auth.Error) {
    // console.error(error);
    // this.notify.update(error.message, 'error');
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/email-already-in-use') {
      console.error('There already exists an account with the given email address.');
    } else if (errorCode === 'auth/invalid-email') {
      console.error('The email address is not valid.');
    } else if (errorCode === 'auth/operation-not-allowed') {
      console.error('The email/password accounts are not enabled.');
    } else if (errorCode === 'auth/weak-password') {
      console.error('The password is not strong enough.');
    } else {
      console.error(errorMessage);
    }
    console.log(error);
  }
}
