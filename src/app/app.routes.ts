import { Routes } from '@angular/router';
import {HomeComponent} from "./components/features/home/home.component";
import {LunchDetailComponent} from "./components/features/lunch-detail/lunch-detail.component";
import {PersonComponent} from "./components/features/person/person.component";

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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
