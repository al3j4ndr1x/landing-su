import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent
    extends NbRegisterComponent implements OnInit {

  user$: Observable<User>;
  errorMessage: string;

  constructor(
    public nbAuth: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) public options: Record<string, unknown>,
    public cd: ChangeDetectorRef,
    public router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService) {

      super(nbAuth, options, cd, router);

    // Get the auth state, then fetch the Firestore user document or return null
    //   this.user$ = this.afAuth.authState.pipe(
    //     switchMap(user => {
    //         // Logged in
    //       if (user) {
    //         return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //       } else {
    //         // Logged out
    //         return of(null);
    //       }
    //     })
    //   );
    }

  ngOnInit() { }

  // Email/Password Sign Up
  /* istanbul ignore next */
  async register() {
    try {
      // console.log('Register with password', this.user);
      this.user.displayName = this.user.fullName;
      await this.authService.emailSignUp(this.user.email, this.user.password);
      this.router.navigate(['/profile']);
    } catch (error) {
        // Handle Firebase Errors firebase.auth.Error
        // await this.handleError(error);
        // // return []; // if we aren't handling the error anyway
        // // console.error(error);
        // this.errorMessage = 'Failed to register email with password!';
        // console.log(this.errorMessage);
        // // throw error; // throw the error and allow upstream code to handle it or not
    }
  }

  // Sign up with Google provider
  // async registerWithGoogle() {
  //   await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  //     .catch(function(error) {
  //       // Handle Firebase Errors
  //       this.handleError(error);
  //     });
  // }

  // private updateUserData(user: any) {
  //   // Sets user data to firestore on login
  //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

  //   const data = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName || 'nameless user',
  //     fullName: user.fullName || 'nameless user',
  //     photoURL: user.photoURL,
  //     rememberMe: user.rememberMe,
  //     terms: user.terms
  //   };

  //   return userRef.set(data, { merge: true });

  // }

  // If error, console log and notify user
  // private handleError(error: firebase.auth.Error) {

  //   // this.errors = error.code;
  //   // this.messages = error.message;
  //   const errorCode = error.code;
  //   const errorMessage = error.message;

  //   if (errorCode === 'auth/email-already-in-use') {
  //     console.error('There already exists an account with the given email address.');
  //   } else if (errorCode === 'auth/invalid-email') {
  //     console.error('The email address is not valid.');
  //   } else if (errorCode === 'auth/operation-not-allowed') {
  //     console.error('The email/password accounts are not enabled.');
  //   } else if (errorCode === 'auth/weak-password') {
  //     console.error('The password is not strong enough.');
  //   } else {
  //     console.error(errorMessage);
  //   }
  //   console.log(error);
  // }
}
