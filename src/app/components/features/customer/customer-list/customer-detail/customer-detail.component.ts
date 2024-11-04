import {Component, OnInit} from '@angular/core';
import {CustomerModel} from "../../../../../models/customer.model";
import {Router} from "@angular/router";
import {ButtonComponent} from "../../../../../shared/components/ui-components/button/button.component";

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit{
  customer: CustomerModel = {} as CustomerModel;

  constructor(protected router: Router) {
  }

  ngOnInit() {
    this.customer = history.state.customer;
    console.log(this.customer)
  }

  goToCustomerListComponent() {
    return this.router.navigate(['customer']);
  }
}
