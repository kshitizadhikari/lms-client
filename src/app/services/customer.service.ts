import {inject, Injectable} from '@angular/core';
import {CustomerModel} from "../models/customer.model";
import {HttpService} from "./http.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  CustomerFormComponent
} from "../components/features/customer/customer-list/customer-form/customer-form.component";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpService<CustomerModel> {

  private dialog = inject(MatDialog);

  constructor() {
    super();
    this.setEndPoint('customer');
  }

  openCustomerForm(action_type: any, customerData?: CustomerModel): MatDialogRef<CustomerFormComponent> {
    return this.dialog.open(CustomerFormComponent, {
      minWidth: '600px',
      data: {
        action_type: action_type,
        customer: customerData ?? {}
      }
    });
  }
}
