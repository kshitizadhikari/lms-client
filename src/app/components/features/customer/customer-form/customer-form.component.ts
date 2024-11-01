import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {InputErrorComponent} from "../../../../shared/components/input-error-message/input-error.component";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UtilService} from "../../../../shared/services/util.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ACTION_TYPES} from '../../../../shared/utilities/constants';
import {CustomerService} from "../../../../services/customer.service";
import {CustomerModel} from "../../../../models/customer.model";
import {NgClass} from "@angular/common";

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
  protected readonly ACTION_TYPES = ACTION_TYPES;
  public action_type: string;
  public customer: CustomerModel = {} as CustomerModel;
  public form!: FormGroup;
  public buttonText: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private customerService: CustomerService,
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
      phone: [this.customer?.phone || '', [Validators.required]]
    });

    if (this.action_type == this.ACTION_TYPES.EDIT) {
      this.buttonText = 'Update';
    }
  }

  ngOnInit(): void {

  }

  getFormControl(ctrlName: string): AbstractControl {
    return this.form.controls[ctrlName];
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

  getErrorClass(ctrl: AbstractControl): string {
    return this.utilService.getErrorClass(ctrl);
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackbarService.error('Invalid Form Values');
      return;
    }

    const formData = this.form.getRawValue();
    debugger
    if (this.action_type == ACTION_TYPES.NEW) {
      this.customerService.create(formData).subscribe({
        next: (res: CustomerModel): void => {
          this.snackbarService.success('Customer created successfully');
          this.dialogRef.close(res);
        },
        error: (err): void => {
          console.log('Error creating customer: ', err);
        }
      });
    } else {
      this.customerService.update(formData).subscribe({
        next: (res: CustomerModel): void => {
          this.snackbarService.success('Customer updated successfully');
          this.dialogRef.close(res);
        },
        error: (err): void => {
          console.log('Error updating customer: ', err);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
