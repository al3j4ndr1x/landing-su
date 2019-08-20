import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import {
  NbThemeModule,
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbIconModule,
  NbContextMenuModule,
  NbUserModule,
  NbMenuModule,
  NbActionsModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { By } from '@angular/platform-browser';

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

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (uid: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (id: any) => new Promise((resolve, reject) => resolve()),
    }),
  }),
};


describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let sidebarService: NbSidebarService;
  let menuService: NbMenuService;

  let sidebarServiceStub: Partial<NbSidebarService>;
  let menuServiceStub: Partial<NbMenuService>;

  beforeEach(async(() => {

    // stub NbSidebarService for test purposes
    sidebarServiceStub = {
      toggle: jest.fn().mockReturnThis(),
      onToggle: jest.fn().mockReturnThis(),
      onCollapse: jest.fn().mockReturnThis(),
      onExpand: jest.fn().mockReturnThis(),
    };
    menuServiceStub = {
      onItemClick: jest.fn(),
    };

    // let testMenu = 'Test Menu';
    // // Create a fake NbSidebarService object with a `toggle()` spy
    // const sidebarService = jasmine.createSpyObj('NbSidebarService', ['toggle(false, right)']);
    // // Make the spy return a synchronous Observable with the test data
    // const onToggleSpy = sidebarService.toggle.and.returnValue( of(testMenu) );

    // let testSideItem = 'Test Side Item';
    // // Create a fake NbMenuService object with a `OnItemClick()` spy
    // const menuService = jasmine.createSpyObj('NbMenuService', ['OnItemClick']);
    // // Make the spy return a synchronous Observable with the test data
    // const onItemClickSpy = menuService.OnItemClick.and.returnValue( of(testSideItem) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbLayoutModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbEvaIconsModule,
        NbIconModule,
        NbUserModule,
        NbContextMenuModule,
        NbActionsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: FirestoreStub },
       // { provide: NbMenuService, useValue: menuServiceStub },
       // { provide: NbSidebarService, useValue: sidebarServiceStub },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance; // AppComponent test instance
    // No needed because we have Automatic change detection mode
    // fixture.detectChanges();

    // UserService from the root injector
    // const sidebarService = TestBed.get(NbSidebarService);
    // UserService actually injected into the component
    sidebarService = fixture.debugElement.injector.get(NbSidebarService);
    menuService = fixture.debugElement.injector.get(NbMenuService);

  }));

  // beforeAll(() => {
  // });

  afterAll(() => {
    app.ngOnDestroy();
    expect(app.alive).toBeFalsy();
  });

/*   test('this test will fail', () => {
    throw new Error('It crashed!');
  }); */

  test('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
    expect(app).toBeTruthy();
  });

  test('should show a side menu', () => {
    // const buttonDeb: DebugElement = fixture.debugElement;
    const fixture2 = TestBed.createComponent(AppComponent);
    const app2 = fixture2.componentInstance;
    // NbSidebarService actually injected into the component
    // const sidebarService = fixture.debugElement.injector.get(NbSidebarService);
    // const sidebarService = TestBed.get(NbSidebarService);
    // const buttonEle: HTMLElement = fixture.debugElement.nativeElement;
    const buttonSideMenu = fixture.debugElement.nativeElement.querySelector('#sidemenubutton');
    expect(buttonSideMenu).toBeDefined();
  });

  // it('stub object and injected NbSidebarService should not be the same', () => {
  //   expect(sidebarServiceStub === sidebarService).toBe(false);
  //   // Changing the stub object has no effect on the injected service
  //   // sidebarServiceStub.toggle(false, 'right');
  //   expect(sidebarServiceStub.toggle(false, 'right')).toHaveBeenCalled();
  // });

  // test('should exist menu item', () => {
  //   const itemEle: HTMLElement = fixture.nativeElement.querySelector('#sidemenubutton');
  //   spyOn(app.menuService, 'onItemClick');
  //   expect(itemEle.textContent).toBe('Login');
  //   itemEle.click();
  // });

});
