import {inject, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {FoodModel} from "../models/food.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FoodFormComponent} from "../components/features/food/food-list/food-form/food-form.component";

@Injectable({
  providedIn: 'root'
})
export class FoodService extends HttpService<FoodModel> {

  private dialog = inject(MatDialog);

  constructor() {
    super();
    this.setEndPoint('food');
  }

  openFoodForm(action_type: any, foodData?: FoodModel): MatDialogRef<FoodFormComponent> {
    return this.dialog.open(FoodFormComponent, {
      minWidth: '600px',
      data: {
        action_type: action_type,
        food: foodData ?? {}
      }
    });
  }

}
