import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { DashboardComponent }          from './dashboard.component';
import { GearclosetComponent }          from './gearcloset.component';
import { TripdetailComponent }          from './trip/tripdetail.component';
import { TripdetailPublicComponent }          from './trip/tripdetailpublic.component';

import { AuthGuard } from './shared/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'gearcloset', component: GearclosetComponent, canActivate: [AuthGuard]},
  {path: 'trips/:id', component: TripdetailComponent, canActivate: [AuthGuard]},
  {path: 'trips/:id/public', component: TripdetailPublicComponent},
  {path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
