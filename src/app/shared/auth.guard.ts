
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: FirebaseAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth
      .take(1) // <-- WHY? I thought it would be .asObservable() instead
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) this.router.navigate(['/login']);
      });
  }
}
