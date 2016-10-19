import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

@Component({
  selector: 'dashboard',
  templateUrl: './gearcloset.template.html'
})

export class GearclosetComponent {
  message: string;
  items: FirebaseListObservable<any[]>;
  item: Object;
  newItem: Object;
  user: Object;
  createNew: boolean;
  editItem: boolean;

  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, af: AngularFire) {
    this.items = af.database.list('items', {
      query: {
        orderByChild: 'userId',
        equalTo: auth.getUser()["uid"]
      }
    });
    this.createNew = false;
    this.editItem = false;
    this.item = {};
    this.user = auth.getUser();
    this.newItem = {
      userId: this.user["uid"]
    };

  }

  cancelCreate() {
    this.newItem = {
      userId: this.user["uid"]
    };
    this.createNew = false;
  }

  cancelEdit() {
    this.item = {};
    this.editItem = false;
  }

  seed() {
    let seedItems = this.seedItems();
    for (let item of seedItems) {
      item["userId"] = this.user["uid"];
      this.items.push(item);
    }
  }

  create(newName: string, newBrand: string, newPrice: number, newWeight: number) {
    this.items.push(this.newItem);
    this.newItem = {
      userId: this.user["uid"]
    };
    this.createNew = false;
  }

  select(item: Object) {
    this.item = item;
    this.editItem = true;
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
    this.editItem = false;
  }

  delete() {
    this.items.remove(this.item["$key"]);
    this.item = {};
    this.editItem = false;
  }

  seedItems() {
    return [
      {
        name: 'ULA',
        brand: 'Circuit',
        category: 'Pack',
        weight: 41,
        price: 235.00,
      },
      {
        name: 'Double Rainbow',
        brand: 'Tarptent',
        category: 'Shelter',
        weight: 43,
        price: 334.00,
      },
      {
        name: 'Windburner',
        brand: 'MSR',
        category: 'Cooking',
        weight: 15,
        price: 130.00,
      },
      {
        name: 'GigaPower Auto Stove',
        brand: 'Snow Peak',
        category: 'Cooking',
        weight: 3.8,
        price: 49.99,
      },
      {
        brand: 'Therm a Rest',
        name: 'EvoLite',
        category: 'Sleep',
        weight: 17,
        price: 120.00,
      },
      {
        brand: 'Therm a Rest',
        name: 'X Lite',
        category: 'Sleep',
        weight: 12,
        price: 129.00,
      },
      {
        brand: 'Kelty',
        name: 'Cosmic 20 Sleeping Bag',
        category: 'Sleep',
        weight: 41,
        price: 120.00,
      },
      {
        brand: 'Kelty',
        name: 'Cosmic 40 Sleeping Bag',
        category: 'Sleep',
        weight: 29,
        price: 89.00,
      },
      {
        brand: 'Black Diamond',
        name: 'ReVolt Headlamp',
        category: 'Tools',
        weight: 4,
        price: 45.00,
      },
      {
        brand: 'Sawyer',
        name: 'Squeeze Mini Water Filter',
        category: 'Hydration',
        weight: 1,
        price: 20.00,
      },
      {
        brand: 'Bushcraft',
        name: 'Arizona Alcohol Stove',
        category: 'Cooking',
        weight: 0.53,
        price: 20.00,
      },
      {
        brand: 'Bear Vault',
        name: '500',
        category: 'Pack',
        weight: 41,
        price: 74.00,
      },
      {
        brand: 'Osprey',
        name: 'Volt 75',
        category: 'Pack',
        weight: 60,
        price: 189.00,
      },
      {
        brand: 'Kelty',
        name: 'Redwing 50',
        category: 'Pack',
        weight: 48,
        price: 125.00,
      },
      {
        brand: 'Black Diamond',
        name: 'Trail Ergo Cork Trekking Poles',
        category: 'Misc',
        weight: 0,
        price: 110.00,
      },
      {
        brand: 'Sunto',
        name: 'Compass',
        category: 'Navigation',
        weight: 3,
        price: 15.00,
      },
      {
        brand: 'Uniqlo',
        name: 'Drift Jacket',
        category: 'Clothing',
        weight: 3,
        price: 89.00,
      },
      {
        brand: 'Toaks',
        name: '600 mL Titanium Pot',
        category: 'Cooking',
        weight: 3.8,
        price: 28.00,
      },
      {
        brand: 'Marmot',
        name: 'Precip',
        category: 'Clothing',
        weight: 13.1,
        price: 99.00,
      },
      {
        brand: 'AAA',
        name: 'First Aid Kit',
        category: 'Medical',
        weight: 16.1,
        price: 20.00,
      },
      {
        brand: 'Coghlans',
        name: 'Trowel',
        category: 'Hygiene',
        weight: 2.00,
        price: 2.00,
      },
      {
        brand: 'Amazon',
        name: 'Kindle',
        category: 'Misc',
        weight: 7.60,
        price: 120.00,
      }
    ];
  }

  getClasses() {
    return {
      'Shelter': 'teal home',
      'Cooking': 'olive food',
      'Clothing': 'grey spy',
      'Sleep': 'blue hotel',
      'Pack': 'orange travel',
      'Hydration': 'blue theme',
      'Navigation': 'yellow compass',
      'Medical': 'red first aid',
      'Tools': 'grey configure',
      'Hygiene': 'purple database',
      'Misc': 'grey cube'
    };
  }
}
;
