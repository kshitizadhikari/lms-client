import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerFormComponent} from "../components/features/customer/customer-form/customer-form.component";
import {CustomerModel} from "../models/customer.model";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpService<CustomerModel>{
  private dialogService = inject(MatDialog);
  constructor() {
    super();
    this.setEndPoint('customer');
  }

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
