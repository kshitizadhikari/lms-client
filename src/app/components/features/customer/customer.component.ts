import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../shared/components/ui-components/button/button.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputErrorComponent} from "../../../shared/components/input-error-message/input-error.component";
import {CustomerListComponent} from "./customer-list/customer-list.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    InputErrorComponent,
    CustomerListComponent
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


}
