import {Component} from '@angular/core';
import {FoodListComponent} from "./food-list/food-list.component";

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    FoodListComponent
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {

}
