import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputErrorComponent} from "../../../../../shared/components/input-error-message/input-error.component";
import {NgClass, NgForOf} from "@angular/common";
import {Subscription} from "rxjs";
import {ActionType, FoodType} from "../../../../../models";
import {FoodModel} from "../../../../../models/food.model";
import {FoodService} from "../../../../../services/food.service";
import {UtilService} from "../../../../../shared/services/util.service";
import {SnackbarService} from "../../../../../shared/services/snackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {APP_CONSTANTS} from "../../../../../shared/utilities/constants";

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    FormsModule,
    InputErrorComponent,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.css'
})
export class FoodFormComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  protected readonly foodTypes = Object.values(FoodType);

  public action_type: string;
  public food: FoodModel = {} as FoodModel;
  public form!: FormGroup;
  public buttonText: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private utilService: UtilService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { action_type: string, food: FoodModel },
    private dialogRef: MatDialogRef<FoodModel>) {
    this.action_type = data.action_type;
    this.food = data.food || {} as FoodModel;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.food?.id || null],
      name: [this.food?.name || '', [Validators.required]],
      price: [this.food?.price || null, [
        Validators.required,
        Validators.pattern(APP_CONSTANTS.Regex.PositiveNumbers)
      ]],
      foodType: [this.food?.foodType || '', [Validators.required]]
    });

    if (this.action_type == ActionType.EDIT) {
      this.buttonText = 'Update'
    }
  }

  getFormControl(ctrlName: string): AbstractControl {
    return this.form.controls[ctrlName];
  }

  getErrorClass(ctrl: AbstractControl): string {
    return this.utilService.getErrorClass(ctrl);
  }

  getIdCtrl(): AbstractControl {
    return this.getFormControl('id');
  }

  getNameCtrl(): AbstractControl {
    return this.getFormControl('name');
  }

  getPriceCtrl(): AbstractControl {
    return this.getFormControl('price');
  }

  getTypeCtrl(): AbstractControl {
    return this.getFormControl('type');
  }


  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackbarService.error('Invalid form values');
      return;
    }

    const formData = this.form.getRawValue();
    if (this.action_type == ActionType.NEW) {
      this.sub.add(
        this.foodService.create(formData).subscribe({
          next: (res: FoodModel): void => {
            this.snackbarService.success('Food added successfully');
            this.dialogRef.close(res);
          },
          error: (err): void => {
            this.snackbarService.error(err);
          }
        })
      );
    } else {
      this.foodService.update(formData).subscribe({
        next: (res: FoodModel): void => {
          this.snackbarService.success('Food updated successfully');
          this.dialogRef.close(res);
        },
        error: (err): void => {
          this.snackbarService.error(err);
        }
      })
    }

  }

  resetForm() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
