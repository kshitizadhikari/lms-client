import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {MenuModel} from "../models/menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService extends HttpService<MenuModel> {

  constructor() {
    super();
    this.setEndPoint('menu');
  }

}
