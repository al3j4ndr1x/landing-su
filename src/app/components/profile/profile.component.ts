import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // public user: User;

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

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, public authService: AuthService) { }

  ngOnInit() { }

  // getAuthenticated(): boolean {
  //   return !!this.authService.isAuthenticated;
  // }

}

// In the component HTML, we define two templates based on the user$ Observable.
// If the value is null, we show the guest template,
// but if it is defined we show the authenticated template and corresponding user data.
// The async will automatically subscribe to the Observable and unsubscribe when the component is destroyed.
