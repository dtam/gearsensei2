import { Component, OnInit } from '@angular/core';
import { Auth }      from '../auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/map';

@Component({
  selector: 'dashboard',
  templateUrl: './tripdetail.template.html'
})

export class TripdetailComponent implements OnInit {
  message: string;
  trip: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any[]>;
  tripItems: FirebaseListObservable<any[]>;
  user: Object;
  addItem: boolean;
  addItemId: string;
  tripId: string;
  originalItems: {};
  itemsList: any;
  tripItemsIterable: any;
  totalWeight: number;
  public pieChartColors: any[] = [{
    backgroundColor: [
      "#F2711C",
      "#FBBD08",
      "#B5CC18",
      "#21BA45",
      "#00B5AD",
      "#2185D0",
      "#6435C9",
      "#A333C8",
      "#E03997",
      "#A5673F",
      "#767676",
      "#1B1C1D",
      "#FF695E",
      "#FF851B",
    ]
  }
  ];
  public pieChartLabels: string[] = [
    'Shelter',
    'Cooking',
    'Clothing',
    'Sleep',
    'Pack',
    'Hydration',
    'Navigation',
    'Medical',
    'Tools',
    'Hygiene',
    'Misc'
  ];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, private af: AngularFire, private location: Location, private route: ActivatedRoute) {
    this.items = af.database.list('items', {
      query: {
        orderByChild: 'userId',
        equalTo: auth.getUser()["uid"]
      }
    });

    this.items.subscribe(items=> {
      this.itemsList = items;
    });
    this.addItemId = '';
    this.user = auth.getUser();
    this.addItem = false;
    this.originalItems = {};
    this.totalWeight = 0;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.trip = this.af.database.object('trips/' + id);
      this.trip.subscribe(snapshot => {
        this.tripId = snapshot.$key;
        this.originalItems = snapshot.items;
      });
      this.tripItems = this.af.database.list('items', {
        query: {
          orderByChild: 'trips/' + id,
          equalTo: true
        }
      });

      this.tripItems.subscribe(items=> {

        if (items) {
          this.tripItemsIterable = items;
          let weight = 0;
          let categoryWeights = {};

          for (let item of items) {
            if (categoryWeights[item.category] == undefined) {
              categoryWeights[item.category] = +item.weight
            } else {
              categoryWeights[item.category] = categoryWeights[item.category] + +item.weight
            }
            weight = weight + +item.weight;
          }

          let labels = [];
          let data = []

          for (let category of this.pieChartLabels) {
            if (categoryWeights[category]) {
              data.push(categoryWeights[category]);
            } else {
              data.push(0);
            }
          }
          this.pieChartData = data;
          this.totalWeight = weight;
        }
      });
    });
  }

  addItemAction() {
    if (this.addItemId == "") {
      return;
    }

    if (this.originalItems == undefined) {
      this.originalItems = {};
      this.originalItems[this.addItemId] = true;
      this.trip.update({
        items: this.originalItems
      });
    } else {
      this.originalItems[this.addItemId] = true;
      this.trip.update({
        items: this.originalItems
      });
    }

    for (let item of this.itemsList) {
      if (item.$key == this.addItemId) {
        if (item.trips == undefined) {
          let newTrips = {};
          newTrips[this.tripId] = true;
          this.items.update(item.$key, {trips: newTrips})
        } else {
          item.trips[this.tripId] = true;
          this.items.update(item.$key, {trips: item.trips});
        }
      }
    }

    this.addItemId = "";
    this.addItem = false;

  }

  updateItem() {
    this.trip.set({
      name: this.trip["name"],
      date: this.trip["date"],
      duration: this.trip["duration"],
      description: this.trip["description"]
    });
  }

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

  removeItem(item) {
    if (this.originalItems[item]) {
      delete this.originalItems[item];
    }
    this.trip.update({
      items: this.originalItems
    });

    for (let itemObj of this.itemsList) {
      if (itemObj.$key == item) {
        delete itemObj.trips[this.tripId];
        this.tripItems.update(itemObj.$key, {trips: itemObj.trips});
      }
    }
  }
}
