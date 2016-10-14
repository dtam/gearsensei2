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
  items: FirebaseListObservable<any[]>;
  item: Object;
  newItem: Object;
  user: Object;
  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, af: AngularFire) {
        this.items = af.database.list('items',{
          query: {
            orderByChild: 'userId',
            equalTo: auth.getUser()["uid"]
          }
        });
        this.item = {};
        this.user = auth.getUser();
        this.newItem = {
          userId: this.user["uid"]
        };

  }
  create(newName: string, newBrand: string, newPrice: number, newWeight: number) {
    this.items.push(this.newItem);
    this.newItem = {
          userId: this.user["uid"]
        };
  }
  select(item: Object) {
    this.item = item;
  }
  updateItem() {
    this.items.update(this.item["$key"], {
      name: this.item["name"],
      brand: this.item["brand"],
      price: this.item["price"],
      weight: this.item["weight"],
      category: this.item["category"]
    });
    this.item = {};
  }
  delete() {
    this.items.remove(this.item["$key"]);
    this.item = {};
  }
};
