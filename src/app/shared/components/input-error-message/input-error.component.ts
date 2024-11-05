import {Component, Input,OnInit} from '@angular/core';
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgClass
  ],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.css'
})
export class InputErrorComponent implements OnInit{
 @Input() ctrl: AbstractControl | undefined | null;
 @Input() name = '';
 @Input() min: number = 0;
 @Input() max: number = 0;
 @Input() minLength: number = 0;
 @Input() maxLength: number = 0;
 @Input() errMsg = '';
 @Input() lessThan = 0;
 @Input() greaterThan = 0;

 constructor() {}

  ngOnInit(): void {
  }
}
