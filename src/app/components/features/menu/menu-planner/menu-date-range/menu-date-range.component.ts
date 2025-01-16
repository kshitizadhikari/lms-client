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
import {CustomDate, DateRangeModel} from "../../../../../models/date-range.model";
import {SnackbarService} from "../../../../../shared/services/snackbar.service";

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

  constructor(
    private snackbar: SnackbarService
  ) {
  }

  updateDate() {
    if (this.endDate == '') {
      return;
    }

    const start = moment(this.startDate);
    const end = moment(this.endDate);

    if (this.endDate) {
      if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
        this.snackbar.error('Invalid date range.');
        return;
      }
    }

    const numberOfDays = end.diff(start, 'days') + 1;

    if (numberOfDays > 30) {
      this.startDate = '';
      this.endDate = '';
      this.snackbar.error('Date range is too long.');
      return;
    }
    const days: CustomDate[] = [];

    let currentDate = start.clone();
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      days.push({
        date: currentDate.toDate(),
        day: currentDate.format('dddd')
      })
      currentDate.add(1, 'days');
    }

    const dateObj: DateRangeModel = {
      startDate: start.toDate(),
      endDate: end.toDate(),
      numberOfDays: numberOfDays,
      days: days,
    };

    this.outputDateEvent.emit(dateObj);
  }
}
