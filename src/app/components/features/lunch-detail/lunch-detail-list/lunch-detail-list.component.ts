import { Component } from '@angular/core';
import {LunchDetailFormComponent} from "./lunch-detail-form/lunch-detail-form.component";

@Component({
  selector: 'app-lunch-detail-list',
  standalone: true,
  imports: [
    LunchDetailFormComponent
  ],
  templateUrl: './lunch-detail-list.component.html',
  styleUrl: './lunch-detail-list.component.css'
})
export class LunchDetailListComponent {

}
