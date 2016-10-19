import { Component }         from '@angular/core';
import { Auth }              from './auth.service';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  providers: [Auth],
  templateUrl: './app.template.html'
})

export class AppComponent {
  constructor(public auth: Auth) {
  }
}
