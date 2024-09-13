import {Component, Inject, OnDestroy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ACTION_TYPES } from "../../../../shared/utilities/constants";
import { PersonModel } from "../../../../models/person.model";
import { CommonModule } from "@angular/common";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputErrorComponent } from "../../../../shared/components/input-error-message/input-error.component";
import { UtilService } from "../../../../shared/services/util.service";
import { PersonService } from "../../../../services/person.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorComponent,
  ],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnDestroy{
  public sub: Subscription = new Subscription();
  protected readonly ACTION_TYPES = ACTION_TYPES;
  public ACTION_TYPE: string;
  public person: PersonModel;
  public form: FormGroup;
  public buttonText: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private personService: PersonService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { action_type: string, person: PersonModel },
    private dialogRef: MatDialogRef<PersonFormComponent>
  ) {
    // Initialize the action type and person model
    this.ACTION_TYPE = data.action_type;
    this.person = data.person || {} as PersonModel;

    // Build the form
    this.form = this.fb.group({
      id: [this.person?.id || null],
      firstName: [this.person?.firstName || '', [Validators.required]],
      lastName: [this.person?.lastName || '', [Validators.required]],
      phone: [this.person?.phone || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });

    // Set the button text
    if (this.ACTION_TYPE == this.ACTION_TYPES.EDIT) {
      this.buttonText = 'Update'
    }
  }

  getFormControl(ctrlName: string): AbstractControl {
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

  resetForm(): void {
    this.form.reset();
  }

  getErrorClass(ctrl: AbstractControl): string {
    return this.utilService.getErrorClass(ctrl);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackbarService.error('Invalid Form Values');
      return;
    }

    const formData = this.form.getRawValue();

    if (this.ACTION_TYPE === ACTION_TYPES.NEW) {
      this.personService.createPerson(formData).subscribe({
        next: (response: PersonModel): void => {
          this.snackbarService.success('Person Created Successfully');
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error creating person:', err);
        }
      });
    } else if (this.ACTION_TYPE === ACTION_TYPES.EDIT) {
      this.personService.updatePerson(formData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error updating person:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
