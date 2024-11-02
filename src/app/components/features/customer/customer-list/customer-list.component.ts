import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/ui-components/button/button.component";
import {CustomerService} from "../../../../services/customer.service";
import {ACTION_TYPES} from "../../../../shared/utilities/constants";
import {Subscription} from "rxjs";
import {CustomerModel} from "../../../../models/customer.model";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    ButtonComponent,
    MatTableModule,
    MatDialogModule,
    MatButton,
    JsonPipe
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'action'];
  clickedRows = new Set<CustomerModel>();
  customers: CustomerModel[] = [];
  ACTION_TYPES = ACTION_TYPES;

  constructor(
    protected service: CustomerService,
    protected snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    this.sub.add(
      this.service.getAll().subscribe({
        next: (res) => {
          this.customers = res;
        },
        error: (err) => {
          console.log('Error fetching customers : ', err);
        }
      })
    );
  }

  toggleClickedRow(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
      return;
    }
    this.clickedRows.add(row);
  }

  deleteCustomer(id: string): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.snackbarService.success('Customer has been deleted');
        this.customers = this.customers.filter(customer => customer.id !== id);
      },
      error: (err) => {
        console.log('Error deleting customer data :', err);
      }
    })
  }

  // handle form
  openCustomerForm(action_type: string, customer?: CustomerModel) {
    const dialogRef = this.service.openCustomerForm(action_type, customer);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action_type == ACTION_TYPES.NEW) {
          this.customers = [...this.customers, result];
        } else if (action_type == ACTION_TYPES.EDIT) {
          const index = this.customers.findIndex(c => c.id === result.id);
          if (index !== -1) {
            Object.assign(this.customers[index], result);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
