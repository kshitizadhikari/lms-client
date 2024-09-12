import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {PersonFormComponent} from "./person-form/person-form.component";
import {ACTION_TYPES} from "../../../utilities/constants";
import {PersonModel} from "../../../models/person.model";

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  private dialogService = inject(MatDialog);

  openPersonForm(action_type: any, personData?: PersonModel) {
    this.dialogService.open(PersonFormComponent, {
      minWidth: '500px',
      data: {
        action_type: action_type,
        person: {} as PersonModel
      }
    })
  }

  protected readonly open = open;
  protected readonly ACTION_TYPES = ACTION_TYPES;
}
