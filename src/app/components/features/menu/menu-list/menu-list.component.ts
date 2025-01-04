import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/ui-components/button/button.component";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from '@angular/material/datepicker';
import moment from "moment";
import {MenuFormComponent} from "./menu-form/menu-form.component";
import {FormsModule} from "@angular/forms";

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

  constructor() {
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
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
