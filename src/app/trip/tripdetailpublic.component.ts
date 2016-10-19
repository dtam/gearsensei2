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
  templateUrl: './tripdetailpublic.template.html'
})

export class TripdetailPublicComponent implements OnInit {
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

    this.addItemId = '';
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

          let data = [];

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

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

}
