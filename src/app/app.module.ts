import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgSemanticModule } from "ng-semantic";
import { DatePicker } from 'ng2-datepicker/ng2-datepicker';

import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { DashboardComponent } from './dashboard.component';
import { GearclosetComponent } from './gearcloset.component';
import { AuthGuard } from './shared/auth.guard';
import { routing,
         appRoutingProviders } from './app.routes';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAshH7RYjLOk78CLVqI6Cjj-gSlw5u6vzs",
    authDomain: "gearsensei2.firebaseapp.com",
    databaseURL: "https://gearsensei2.firebaseio.com",
    storageBucket: "gearsensei2.appspot.com",
    messagingSenderId: "625470581650"
  };

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        GearclosetComponent,
        DatePicker
    ],
    providers:    [
        appRoutingProviders,
        AuthGuard,
        AUTH_PROVIDERS
    ],
    imports:      [
        BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
        routing,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgSemanticModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
