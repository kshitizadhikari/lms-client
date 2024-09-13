import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {PersonListComponent} from "./person-list/person-list.component";

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule, PersonListComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
}
