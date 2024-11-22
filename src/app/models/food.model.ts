import {FoodType} from "./enum";

export interface FoodModel  {
  id: string;
  name: string;
  price: number;
  type: FoodType;
}
