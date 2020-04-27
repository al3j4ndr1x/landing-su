import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // public user: User;

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
