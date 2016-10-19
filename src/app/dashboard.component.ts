import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html'
})

export class DashboardComponent {
  message: string;
  trips: FirebaseListObservable<any[]>;
  trip: Object;
  newTrip: Object;
  user: Object;
  createNew: boolean;
  editItem: boolean;

  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, af: AngularFire) {
    this.trips = af.database.list('trips', {
      query: {
        orderByChild: 'userId',
        equalTo: auth.getUser()["uid"]
      }
    });
    this.createNew = false;
    this.editItem = false;
    this.trip = {};
    this.user = auth.getUser();
    this.newTrip = {
      userId: this.user["uid"],
      items: []
    };

  }

  cancelCreate() {
    this.newTrip = {
      userId: this.user["uid"],
      items: []
    };
    this.createNew = false;
  }

  cancelEdit() {
    this.trip = {};
    this.editItem = false;
  }

  create(newName: string, newBrand: string, newPrice: number, newWeight: number) {
    this.trips.push(this.newTrip);
    this.newTrip = {
      userId: this.user["uid"]
    };
    this.createNew = false;
  }

  select(trip: Object) {
    this.trip = trip;
    this.editItem = true;
  }

  updateItem() {
    this.trips.update(this.trip["$key"], {
      name: this.trip["name"],
      date: this.trip["date"],
      duration: this.trip["duration"],
      description: this.trip["description"]
    });
    this.trip = {};
    this.editItem = false;
  }

  delete() {
    this.trips.remove(this.trip["$key"]);
    this.trip = {};
    this.editItem = false;
  }
}
;
