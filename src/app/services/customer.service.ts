import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerFormComponent} from "../components/features/customer/customer-form/customer-form.component";
import {CustomerModel} from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private dialogService = inject(MatDialog);
  constructor() { }

  openCustomerForm(action_type: any, customerData?: CustomerModel): MatDialogRef<CustomerFormComponent, any> {
    return this.dialogService.open(CustomerFormComponent, {
      minWidth: '600px',
      data: {
        action_type: action_type,
        customer: customerData ?? {}
      }
    });
  }
}
