import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {CreateMenuModel, MenuModel} from "../models/menu.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService extends HttpService<MenuModel> {

  constructor() {
    super();
    this.setEndPoint('menu');
  }

  createMenu(menu: CreateMenuModel): Observable<MenuModel> {
    return this.http.post<MenuModel>(this.url, menu);
  }

  getMenuForDateRange(startDate: string, endDate: string) {

  }

  getAllInclude(...options: any[]): Observable<MenuModel[]> {
    const params = this.convertToHttpParams(options);
    console.log(params);
    return this.http.get<MenuModel[]>(`${this.url}/GetAllInclude`, {params});
  }
}
