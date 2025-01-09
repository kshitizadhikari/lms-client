import {FoodModel} from "./food.model";

export interface MenuModel {
  id: string;
  name: string;
  date: Date;
  menuItems?: MenuItemModel[];
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

export interface CreateMenuModel {
  name: string;
  date: Date;
  foodIds: string[];
}

export interface MenuQueryParameter {
  includeMenuItems: boolean;
}
