// jest.mock('./profile.component'); // ProfileComponent is now a mock constructor

import { ProfileComponent } from './profile.component';
// import * as ProfileComponent from './profile.component';
import { User } from 'src/app/auth/model/user.model';
import { TestBed, ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbIconModule,
  NbUserModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

// Let TypeScript know mocked is an auto-mock of the module
// const mockedProfile = ProfileComponent as jest.Mocked<typeof ProfileComponent>;
// const profileMock = mockedProfile.ProfileComponent.prototype.getAuthenticated.mockImplementation(() => false);

// An email/password user
const userMock: User = {
  email: '',
  // password: '',
  displayName: '',
  rememberMe: true,
  uid: 'ABC123'
};


describe('ProfileComponent', () => {

  const angularFireMock = jest.fn();
  const authFireMock = jest.fn();
  const routerMock = jest.fn();
  const authServiceMock = jest.fn().mockImplementation(() => ({
    isAuthenticated: jest.fn(),
  }));

  const afAuth = new angularFireMock();
  const afs = new authFireMock();
  const router = new routerMock();
  const authService = new authServiceMock();


  // let profileComponent: ProfileComponent;
  // let fixture: ComponentFixture<ProfileComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       RouterTestingModule,
  //       NbThemeModule.forRoot({ name: 'cosmic' }),
  //       NbLayoutModule,
  //       NbSidebarModule.forRoot(),
  //       NbButtonModule,
  //       NbInputModule,
  //       NbCardModule,
  //       NbEvaIconsModule,
  //       NbIconModule,
  //       NbUserModule,
  //       NbAuthModule
  //     ],
  //     declarations: [
  //       ProfileComponent
  //     ],
  //     providers: [
  //       { provide: AngularFireAuth, useValue: afAuth },
  //       { provide: AngularFirestore, useValue: afs },
  //       // { provide: AuthService, useClass: AuthService },
  //       { provide: ComponentFixtureAutoDetect, useValue: true }
  //     ]
  //   }).compileComponents();

  //   // fixture = TestBed.createComponent(ProfileComponent);
  //   // profileComponent = fixture.componentInstance; // ProfileComponent test instance
  //   // // No needed because we have Automatic change detection mode
  //   // fixture.detectChanges();
  // }));

  // beforeEach(() => {
  //   // Clear all instances and calls to constructor and all methods:
  //   // profileMock.mockClear();
  //   fixture = TestBed.createComponent(ProfileComponent);
  //   profileComponent = fixture.componentInstance; // ProfileComponent test instance
  //   // No needed because we have Automatic change detection mode
  //   fixture.detectChanges();
  // });

  afterEach(() => {
    // profileComponent = null;
  });

  // it('should be created', () => {
  //   expect(profileComponent).toBeDefined();
  //   expect(profileComponent).toBeTruthy();
  // });

  it('profile mock should exist', () => {

    const instance = new ProfileComponent(afAuth, afs, router, authService);

    expect(instance).toBeDefined();
    // instance.getAuthenticated();
    expect(instance).toBeTruthy();
  });

  // it('profile mock should exist', () => {
  //   expect(mock).toBeTruthy();
  // });

  // it('user authenticated should be true', () => {
  //   expect(mock.getAuthenticated()).toBe(true);
  //   expect(mock.getAuthenticated).toHaveBeenCalledTimes(1);
  // });

  // it('user not authenticated should be false', () => {
  //   mock.getAuthenticated = jest.fn().mockImplementation(() => false);
  //   expect(mock.getAuthenticated()).toBe(false);
  //   expect(mock.getAuthenticated).toHaveBeenCalledTimes(1);
  // });

  // it('profile mock should exist', () => {
  //   expect(profileMock.mock).toBeTruthy();
  // });

  // it('profile mockClear is working', () => {
  //   // Show that mockClear() is working:
  //   expect(profileMock).not.toHaveBeenCalled();
  // });

  // it('profile getAuthenticated is working', () => {
  //   expect(profileComponent.getAuthenticated()).toHaveBeenCalled();
  // });

  // it('should getAuthenticated return true', () => {
  //   // Constructor should have been called again:
  //   profileMock.mockReturnValueOnce(true);
  //   expect(profileMock()).toEqual(true);
  //   expect(profileMock).toHaveBeenCalledTimes(1);
  // });

  // it('should getAuthenticated return false', () => {
  //   profileMock.mockReturnValueOnce(false);
  //   expect(profileMock()).toEqual(false);
  //   expect(profileMock).toHaveBeenCalledTimes(1);
  // });

});
