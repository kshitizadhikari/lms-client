import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MenuFormComponent} from "../menu-list/menu-form/menu-form.component";
import {NgForOf} from "@angular/common";
import {Subscription} from "rxjs";
import {MenuModel} from "../../../../models/menu.model";
import {IncludeQPModel} from "../../../../models/params/include-qp.model";
import {MenuService} from "../../../../services/menu.service";
import moment from "moment";
import {MenuDateRangeComponent} from "./menu-date-range/menu-date-range.component";
import {DateRangeModel} from "../../../../models/date-range.model";

@Component({
  selector: 'app-menu-planner',
  standalone: true,
  imports: [
    FormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatLabel,
    MatStartDate,
    MatSuffix,
    MenuFormComponent,
    NgForOf,
    MenuDateRangeComponent
  ],
  templateUrl: './menu-planner.component.html',
  styleUrl: './menu-planner.component.css'
})
export class MenuPlannerComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  startDate = '';
  endDate = '';
  numberOfDays: number = 0;
  days: any[] = [];
  weeksMenu: MenuModel[] = [];
  includeQP: IncludeQPModel;

  constructor(
    private menuService: MenuService
  ) {
    this.includeQP = {
      menuItems: true,
      foods: true
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

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

  }

  getDateFromDatePicker($event: DateRangeModel) {
    console.log($event);
  }
}
