import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../shared/components/ui-components/button/button.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputErrorComponent} from "../../../shared/components/input-error-message/input-error.component";
import {CustomerService} from "../../../services/customer.service";
import { ACTION_TYPES } from '../../../shared/utilities/constants';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    InputErrorComponent
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  protected readonly ACTION_TYPES = ACTION_TYPES;

  constructor(protected customerService: CustomerService) {
  }

  ngOnInit() {
  }
}
