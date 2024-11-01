import { Routes } from '@angular/router';
import {HomeComponent} from "./components/features/home/home.component";
import {LunchDetailComponent} from "./components/features/lunch-detail/lunch-detail.component";
import {PersonComponent} from "./components/features/person/person.component";
import {DashboardComponent} from "./components/features/dashboard/dashboard.component";
import {CustomerComponent} from "./components/features/customer/customer.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'person',
    component: PersonComponent
  },
  {
    path: 'lunch-detail',
    component: LunchDetailComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];
