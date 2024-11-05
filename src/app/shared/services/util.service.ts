import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getErrorClass(ctrl: AbstractControl): string {
    if (ctrl.invalid && (!ctrl.untouched || ctrl.dirty)) {
      return 'border-red-500'
    }
    return '';
  }
}
