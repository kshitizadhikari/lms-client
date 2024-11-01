import { Component } from '@angular/core';
import {LunchDetailListComponent} from "./lunch-detail-list/lunch-detail-list.component";

@Component({
  selector: 'app-lunch-detail',
  standalone: true,
  imports: [
    LunchDetailListComponent
  ],
  templateUrl: './lunch-detail.component.html',
  styleUrl: './lunch-detail.component.css'
})
export class LunchDetailComponent {

}
