import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

import {
  NbThemeModule,
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbUserModule,
  NbIconModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { FormsModule } from '@angular/forms';

const credentialsMock = {
  email: 'user.fake@mail.com',
  password: 'ABCValidPassword123',
  rememberMe: true,
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email,
};

const fakeAuthState = new BehaviorSubject(null); // <= Pay attention to this

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and
      .callFake(fakeSignInHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and
      .callFake(fakeSignInHandler),
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(fakeSignOutHandler),
  },
};

const firestoreStub = {
  collection: (name: string) => ({
    doc: (uid: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (id: any) => new Promise((resolve, reject) => resolve(123)),
    }),
  }),
};


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;

  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbAuthModule.forRoot(),
        NbLayoutModule,
        NbSidebarModule.forRoot(),
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbUserModule,
        NbEvaIconsModule,
        NbIconModule,
        NbAlertModule,
        NbCheckboxModule,
        FormsModule,
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: firestoreStub },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    // fixture = TestBed.createComponent(LoginComponent);
    // component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });
});
