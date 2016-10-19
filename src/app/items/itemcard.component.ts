import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Auth }      from '../auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

@Component({
  selector: 'item-card',
  templateUrl: './itemcard.template.html'
})

export class ItemcardComponent implements OnInit {
  @Input() itemId: string;
  @Input() showRemove: string;
  @Output() removeItem = new EventEmitter();
  message: string;
  item: FirebaseObjectObservable<any>;
  newItem: Object;
  user: Object;
  createNew: boolean;
  editItem: boolean;

  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, private af: AngularFire) {
    this.editItem = false;
    this.user = auth.getUser();
  }

  ngOnInit(): void {
    this.item = this.af.database.object('items/' + this.itemId);
  }

  cancelCreate() {
    this.newItem = {
      userId: this.user["uid"]
    };
    this.createNew = false;
  }

  cancelEdit() {
    this.editItem = false;
  }

  updateItem() {
    this.item.set({
      name: this.item["name"],
      brand: this.item["brand"],
      price: this.item["price"],
      weight: this.item["weight"],
      category: this.item["category"]
    });
    this.editItem = false;
  }

  remove() {
    this.removeItem.emit(this.itemId);
  }

  getClasses() {
    return {
      'Shelter': 'orange home',
      'Cooking': 'yellow food',
      'Clothing': 'olive spy',
      'Sleep': 'green hotel',
      'Pack': 'teal travel',
      'Hydration': 'blue theme',
      'Navigation': 'violet compass',
      'Medical': 'purple first aid',
      'Tools': 'pink configure',
      'Hygiene': 'brown database',
      'Misc': 'grey cube'
    };
  }
}
