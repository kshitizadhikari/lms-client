import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {PersonModel} from "../../../../models/person.model";
import {PersonService} from "../../../../services/person.service";
import {Subscription} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {ACTION_TYPES} from "../../../../shared/utilities/constants";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    MatDialogModule
  ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  protected readonly ACTION_TYPES = ACTION_TYPES;
  @Input() refreshPersonList: boolean = false;
  persons: PersonModel[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'action'];
  clickedRows = new Set<PersonModel>();

  constructor(
    private personService: PersonService,
    private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.sub.add(
      this.personService.getAllPerson().subscribe({
        next: (res) => {
          this.persons = res;
        },
        error: err => this.snackbarService.error("Couldn't fetch persons")
      })
    );
  }

  openPersonForm(action_type: string, person?: PersonModel){
    const dialogRef = this.personService.openPersonForm(action_type, person);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action_type == ACTION_TYPES.NEW) {
          this.persons = [...this.persons, result];
        } else if (action_type == ACTION_TYPES.EDIT) {
          const index = this.persons.findIndex(p => p.id === result.id);
          if (index !== -1) {
            Object.assign(this.persons[index], result);
            this.persons[index] = result;
            console.log(this.persons);
          }
        }
      }
    });
  }

  deletePerson(id: string) {
    this.personService.deletePersonById(id).subscribe({
      next: res => {
        this.snackbarService.success('Person deleted successfully');
        this.persons = this.persons.filter(person => person.id !== id);

      },
      error: () => this.snackbarService.error('Unable to delete person')
    });
  }

  toggleClickedRow(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
      return;
    }
    this.clickedRows.add(row);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
