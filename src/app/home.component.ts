import { Component } from '@angular/core';
import { Auth }      from './auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.template.html'
})

export class HomeComponent {
  constructor(private auth: Auth) {}
};
