import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {FoodModel} from "../../../../../models/food.model";
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UtilService} from "../../../../../shared/services/util.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {DatePipe, NgForOf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FoodService} from "../../../../../services/food.service";
import {CreateMenuModel} from "../../../../../models/menu.model";
import {MenuService} from "../../../../../services/menu.service";
import {CustomDate} from "../../../../../models/date-range.model";
import {APP_CONSTANTS} from "../../../../../shared/utilities/constants";
import moment from "moment";
import {SnackbarService} from "../../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    MatFormField,
    MatDatepickerModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent implements OnInit, OnDestroy {
  @Input() date: CustomDate = {} as CustomDate;

  DATE_FORMAT = APP_CONSTANTS.DateFormat;
  private sub: Subscription = new Subscription();
  readonly panelOpenState = signal(false);
  foodForm: FormGroup;
  foods: FoodModel[] = [];
  menu: CreateMenuModel = {} as CreateMenuModel;

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private foodService: FoodService,
    private menuService: MenuService,
    private snackbar: SnackbarService
  ) {
    this.foodForm = fb.group({
      date: [''],
      foodSelections: this.fb.group({})
    });
  }

  ngOnInit(): void {
    this.getAllFoods();
  }

  getFormControl(ctrlName: string): AbstractControl {
    return this.foodForm.controls[ctrlName];
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
          this.snackbar.error(err);
        }
      })
    )
  }

  getFoodSelectionsCtrl() {
    return this.getFormControl('foodSelections') as FormGroup;
  }

  onSubmit(): void {
    const formData = this.foodForm.getRawValue();
    const foodFromForm = Object.entries(formData.foodSelections);
    let selectedFoods = foodFromForm.filter(([id, selected]) => selected)
      .map(([id]) => id);
    this.menu.name = this.date.day + '_' + moment(this.date.date).format('MM-DD-YYYY');
    this.menu.date = new Date(moment(this.date.date).format('MM-DD-YYYY'));
    this.menu.foodIds = selectedFoods;
    console.log(this.menu)
    this.addMenu();
  }

  addMenu(): void {
    this.sub.add(
      this.menuService.createMenu(this.menu).subscribe({
        next: ((res) => {
          console.log(res);
        }),
        error: (err => {
          this.snackbar.error(err);
        })
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
