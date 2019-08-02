import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Landing SU';
  // status = isDevMode();
  ngOnInit() {

/*  if (this.status) {
      console.log('👨‍💻 Development!');
    } else {
      console.log('🚀 Production!');
    } */
  }

}
