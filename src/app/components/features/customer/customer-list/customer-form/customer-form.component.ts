import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {InputErrorComponent} from "../../../../../shared/components/input-error-message/input-error.component";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UtilService} from "../../../../../shared/services/util.service";
import {SnackbarService} from "../../../../../shared/services/snackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../../../../services/customer.service";
import {ActionType, CustomerModel} from "../../../../../models";
import {NgClass} from "@angular/common";
import {APP_CONSTANTS} from "../../../../../shared/utilities/constants";

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    InputErrorComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit, OnDestroy {

  public sub: Subscription = new Subscription();
  public action_type: string;
  public customer: CustomerModel = {} as CustomerModel;
  public form!: FormGroup;
  public buttonText: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private service: CustomerService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { action_type: string, customer: CustomerModel },
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    this.action_type = data.action_type;
    this.customer = data.customer || {} as CustomerModel;

    this.form = this.fb.group({
      id: [this.customer?.id || null],
      firstName: [this.customer?.firstName || '', [Validators.required]],
      lastName: [this.customer?.lastName || '', [Validators.required]],
      email: [this.customer?.email || '', [Validators.required, Validators.email]],
      phone: [this.customer?.phone || '', [
        Validators.required,
        Validators.pattern(APP_CONSTANTS.Regex.PositiveNumbers),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]]
    });

    if (this.action_type == ActionType.EDIT) {
      this.buttonText = 'Update';
    }
  }

  ngOnInit(): void {
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

  getFirstNameCtrl(): AbstractControl {
    return this.getFormControl('firstName');
  }

  getLastNameCtrl(): AbstractControl {
    return this.getFormControl('lastName');
  }

  getEmailCtrl(): AbstractControl {
    return this.getFormControl('email');
  }

  getPhoneCtrl(): AbstractControl {
    return this.getFormControl('phone');
  }

  resetForm(): void {
    this.form.reset();
  }


  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackbarService.error('Invalid Form Values');
      return;
    }

    const formData = this.form.getRawValue();

    if (this.action_type == ActionType.NEW) {
      this.service.create(formData).subscribe({
        next: (res: CustomerModel): void => {
          this.snackbarService.success('Customer created successfully');
          this.dialogRef.close(res);
        },
        error: (err): void => {
          this.snackbarService.error(err);
        }
      });
    } else {
      this.service.update(formData).subscribe({
        next: (res: CustomerModel): void => {
          this.snackbarService.success('Customer updated successfully');
          this.dialogRef.close(res);
        },
        error: (err): void => {
          this.snackbarService.error(err);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
