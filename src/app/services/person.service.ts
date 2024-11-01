import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersonModel} from '../models/person.model';
import {environment} from '../../environments/environment.development';
import {PersonFormComponent} from "../components/features/person/person-form/person-form.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = environment.apiUrl;
  private url = `${this.apiUrl}/person`;
  private http = inject(HttpClient);
  private dialogService = inject(MatDialog);

  openPersonForm(action_type: any, personData?: PersonModel): MatDialogRef<PersonFormComponent> {
    return this.dialogService.open(PersonFormComponent, {
      minWidth: '600px',
      data: {
        action_type: action_type,
        person: personData ?? {}
      }
    });
  }

  getAllPerson(){
    return this.http.get<PersonModel[]>(`${this.url}/get-all`);
  }

  getPersonById(id: string): Observable<PersonModel> {
    return this.http.get<PersonModel>(`${this.url}/${id}`);
  }

  createPerson(person: PersonModel): Observable<PersonModel> {
    return this.http.post<PersonModel>(this.url, person);
  }

  updatePerson(person: PersonModel): Observable<PersonModel> {
    return this.http.put<PersonModel>(`${this.url}/${person.id}`, person);
  }

  deletePersonById(id: string): Observable<PersonModel> {
    return this.http.delete<PersonModel>(`${this.url}/${id}`);
  }

}
