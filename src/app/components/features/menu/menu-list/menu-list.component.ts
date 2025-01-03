import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/ui-components/button/button.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {FoodModel} from "../../../../models/food.model";
import {Subscription} from "rxjs";
import {FoodService} from "../../../../services/food.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {UtilService} from "../../../../shared/services/util.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInput} from "@angular/material/input";
import moment from "moment";

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    ButtonComponent,
    MatExpansionModule,
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInput,
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  foods: FoodModel[] = [];
  foodForm: FormGroup;
  startDate = '';
  endDate = '';
  numberOfDays: number = 0;
  days: any[] = [];

  constructor(
    private foodService: FoodService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) {
    this.foodForm = fb.group({
      date: [undefined],
      foodSelections: this.fb.group({})
    })
  }

  getFormControl(ctrlName: string): AbstractControl {
    return this.foodForm.controls[ctrlName];
  }

  getErrorClass(ctrl: AbstractControl): string {
    return this.utilService.getErrorClass(ctrl);
  }

  getFoodSelectionsCtrl() {
    return this.getFormControl('foodSelections') as FormGroup;
  }

  ngOnInit(): void {
    this.getAllFoods();
  }

  getAllFoods() {
    this.sub.add(
      this.foodService.getAll().subscribe({
        next: (res) => {
          this.foods = res;
          this.foods.forEach(food => {
            this.getFoodSelectionsCtrl().addControl(food.id, new FormControl(false));
          });
        },
        error: (err): void => {
          console.log('Error fetching food:\n', err);
        }
      })
    )
  }

  onSubmit(): void {
    const formData = this.foodForm.getRawValue();
    const foodFromForm = Object.entries(formData.foodSelections);
    let selectedFoods = foodFromForm.filter(([id, selected]) => selected)
      .map(([id]) => id);
      
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  readonly panelOpenState = signal(false);

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

}
