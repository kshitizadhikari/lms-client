import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MenuFormComponent} from "../../menu-list/menu-form/menu-form.component";
import {FormsModule} from "@angular/forms";
import moment from "moment";
import {DateRangeModel} from "../../../../../models/date-range.model";

@Component({
  selector: 'app-menu-date-range',
  standalone: true,
  imports: [
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatLabel,
    MatStartDate,
    MatSuffix,
    MenuFormComponent,
    FormsModule,
  ],
  templateUrl: './menu-date-range.component.html',
  styleUrl: './menu-date-range.component.css'
})
export class MenuDateRangeComponent {
  startDate = '';
  endDate = '';
  @Output() outputDateEvent = new EventEmitter<DateRangeModel>();

  updateDate() {

    if (this.endDate == '') {
      return;
    }
    const start = moment(this.startDate);
    const end = moment(this.endDate);

    const numberOfDays = end.diff(start, 'days') + 1;
    const days: string[] = [];

    let currentDate = start.clone();
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      days.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'days');
    }

    const dateObj: DateRangeModel = {
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      numberOfDays: numberOfDays,
      days: days,
    };

    this.outputDateEvent.emit(dateObj);
  }

}
