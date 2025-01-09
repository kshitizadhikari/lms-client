import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/ui-components/button/button.component";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from '@angular/material/datepicker';
import moment from "moment";
import {MenuFormComponent} from "./menu-form/menu-form.component";
import {FormsModule} from "@angular/forms";
import {MenuModel, MenuQueryParameter} from "../../../../models/menu.model";
import {MenuService} from "../../../../services/menu.service";

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    ButtonComponent,
    NgForOf,
    MatFormField,
    MatDatepickerModule,
    MatFormFieldModule,
    MenuFormComponent,
    FormsModule,
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  startDate = '';
  endDate = '';
  numberOfDays: number = 0;
  days: any[] = [];
  weeksMenu: MenuModel[] = [];
  menuParam: MenuQueryParameter;

  constructor(
    private menuService: MenuService
  ) {
    this.menuParam = {
      includeMenuItems: false
    };
  }

  ngOnInit(): void {

  }

  getWeek() {
    this.days = [];
    const start = moment(this.startDate);
    const end = moment(this.endDate);
    this.numberOfDays = end.diff(start, 'days') + 1;
    let currentDate = start.clone();
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      this.days.push({
        date: currentDate.format('YYYY-MM-DD'),
        day: currentDate.format('dddd')
      });
      currentDate.add(1, 'days');
    }
    this.getWeeksMenu();
  }

  getWeeksMenu() {
    this.weeksMenu = [];
    // this.menuService.getAll().subscribe({
    //   next: ((res) => {
    //     this.weeksMenu = res;
    //     console.log(this.weeksMenu);
    //   }),
    //   error: (err => {
    //     console.log('Error fetching menu for the selected date range\n', err);
    //   })
    // });
    this.menuParam.includeMenuItems = true;
    this.menuService.getAllInclude(this.menuParam).subscribe({
      next: ((res) => {

      }),
      error: ((err) => {
        console.log('Error fetching menu');
      })
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
