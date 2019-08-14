import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

import {
  NbThemeModule,
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbLayoutModule,
        NbSidebarModule.forRoot(),
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbEvaIconsModule,
        NbIconModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  afterEach(() => {
    // component = null;
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  test(`should have as title 'The Landing SU'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('The Landing SU');
  });

  test('should render title in a h6 tag', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h6').textContent).toContain('Welcome to The Landing SU!');
  });

  test('should render title in a h1 tag', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('The future is now! 👨‍💻');
  });

  test(`should have a button with text 'Get early access'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Get early access');
  });

});
