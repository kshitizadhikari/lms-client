import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ACTION_TYPES} from "../../../../utilities/constants";
import {PersonModel} from "../../../../models/person.model";
import {CommonModule} from "@angular/common";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  public ACTION_TYPE;
  public person: PersonModel;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)  public data: { action_type: any, person: PersonModel },
    private dialogRef: MatDialogRef<PersonFormComponent>
  ) {
    this.ACTION_TYPE = data.action_type;
    this.person = {} as PersonModel;
    if (this.ACTION_TYPE == ACTION_TYPES.EDIT) {
      this.person = data.person;
    }

    this.form = this.fb.group({
      id: [null, ],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    })
  }

  getFormControl(ctrlName: string) {
    return this.form.controls[ctrlName];
  }

  getIdCtrl(): AbstractControl {
    return this.getFormControl('id');
  }

  getFirstNameCtrl(): AbstractControl {
    return this.getFormControl('firstName');
  }

  getLastNameCtrl(): AbstractControl {
    return this.getFormControl('lastName');
  }

  getPhoneCtrl(): AbstractControl {
    return this.getFormControl('phone');
  }

  resetForm() {
    this.form.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
