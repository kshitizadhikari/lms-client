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
  dateRangeObj: DateRangeModel = {} as DateRangeModel;
  menu: MenuModel[] = [];
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

  getDateFromDatePicker($event: DateRangeModel) {
    this.dateRangeObj = $event;
    console.log(this.dateRangeObj);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

  }


}
