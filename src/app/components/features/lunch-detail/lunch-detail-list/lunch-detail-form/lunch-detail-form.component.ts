import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-lunch-detail-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './lunch-detail-form.component.html',
  styleUrl: './lunch-detail-form.component.css'
})
export class LunchDetailFormComponent {

}
