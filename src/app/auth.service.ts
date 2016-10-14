import { Injectable }      from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class Auth {
  user: Object;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
      }
      else {
        // user not logged in
        this.user = undefined;
      }
    });
  };

  public login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  };

  public getUser() {
    return this.user;
  }

  public authenticated() {
    return this.user !== undefined;
  };

  public logout() {
    this.af.auth.logout();
    this.user = undefined;
  };
};
