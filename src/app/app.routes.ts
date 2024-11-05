import { Routes } from '@angular/router';
import {HomeComponent} from "./components/features/home/home.component";
import {LunchDetailComponent} from "./components/features/lunch-detail/lunch-detail.component";
import {DashboardComponent} from "./components/features/dashboard/dashboard.component";
import {CustomerComponent} from "./components/features/customer/customer.component";
import {
  CustomerDetailComponent
} from "./components/features/customer/customer-list/customer-detail/customer-detail.component";
import {MenuComponent} from "./components/features/menu/menu.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lunch-detail',
    component: LunchDetailComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'customer/customer-detail',
    component: CustomerDetailComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
