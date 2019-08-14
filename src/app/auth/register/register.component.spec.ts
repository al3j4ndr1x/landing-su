import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';

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
  NbUserModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NbAuthModule } from '@nebular/auth';
import { AuthService } from '../auth.service';

const credentialsMock = {
  email: 'fake.user@email.com',
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

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;

  let authService: AuthService;

  beforeEach(async(() => {
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
        NbAlertModule,
        NbUserModule,
        NbCheckboxModule,
        NbEvaIconsModule,
        NbIconModule,
        FormsModule,
      ],
      declarations: [
        RegisterComponent
      ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    // fixture = TestBed.createComponent(RegisterComponent);
    // component = fixture.componentInstance; // RegisterComponent test instance
    // No needed because we have Automatic change detection mode
    // fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });
});
