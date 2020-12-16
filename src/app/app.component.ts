import { Component, OnInit, isDevMode, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NbMenuService, NbMenuItem, NbSidebarService } from '@nebular/theme';
import { takeWhile, filter, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading: boolean;
  alive = true;
  selectedItem: string;
  itemMenuBag$: Observable<any>;

  userLoggedInItems: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/',
    },
    {
      title: 'Account',
      icon: 'settings-outline',
      // link: '/profile',
      expanded: true,
      children: [
        {
          title: 'Profile',
          icon: 'person-outline',
          link: '/profile',
        },
        {
          title: 'Change Password',
          icon: 'lock-outline',
          link: '#',
        },
        {
          title: 'Privacy Policy',
          icon: 'checkmark-outline',
          link: '#',
        },
      ]
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: '',
    },
  ];

  userLoggedOutItems: NbMenuItem[] = [
    {
      title: 'Login',
      icon: 'log-in-outline',
      link: '/auth/login',
    },
  ];

  /* istanbul ignore next */
  constructor(
    router: Router,
    public authService: AuthService,
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService) {
      this.loading = false;
      router.events.subscribe(
        (event: RouterEvent): void => {
          if (event instanceof RouteConfigLoadStart) {
            this.loading = true;
          } else if (event instanceof RouteConfigLoadEnd) {
            this.loading = false;
          }
        }
      );
    }

  // title = 'The Landing SU';
  // status = isDevMode();
  ngOnInit() {

  /* istanbul ignore next */
  this.menuService.onItemClick()
    .pipe(
      takeWhile(() => this.alive),
      filter(({ tag }) => tag === 'my-context-menu'))
    .subscribe( (menuBag) => {
      if (menuBag) {
        this.selectedItem = menuBag.item.title;
        if (this.selectedItem === 'Logout') {
          this.authService.signOut();
        }
        // return of(this.selectedItem);
      }
      // else {
      //   // logged out, null
      //   return of(null);
      // }
    });
  //   if (this.status) {
  //       console.log('👨‍💻 Development!');
  //     } else {
  //       console.log('🚀 Production!');
  //     }

  }

  ngOnDestroy() {
    // console.log('OnDestroy');
    this.alive = false;
    // this.test.unsubscribe();
  }

  /* istanbul ignore next */
  toggle() {
    this.sidebarService.toggle(false, 'right');
  }
  // getSelectedItem() {
  //   this.menuService.getSelectedItem('my-context-menu')
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe( (menuBag) => {
  //       this.selectedItem = menuBag.item.title;
  //       if (this.selectedItem === 'Logout') {
  //         this.authService.signOut();
  //       }
  //     })
  //     ;
  // }

}
