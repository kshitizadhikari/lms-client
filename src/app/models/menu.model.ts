import {FoodModel} from "./food.model";

export interface MenuModel {
  id: string;
  name: string;
  menuItems?: MenuModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuItemModel {
  id: string;
  menuId: string;
  menu?: MenuModel;
  foodId: string;
  food?: FoodModel;
  createdAt: Date;
  updatedAt: Date;
}
