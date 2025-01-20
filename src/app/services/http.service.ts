import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  private apiUrl = environment.apiUrl;
  protected http = inject(HttpClient);
  private endpoint: string = '';

  constructor() {
  }

  protected get url(): string {
    return `${this.apiUrl}/${this.endpoint}`;
  }

  getAll(...options: any[]): Observable<T[]> {
    const params = this.convertToHttpParams(...options);
    return this.http.get<T[]>(`${this.url}`, {params});
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.url, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(this.url, entity);
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}`);
  }

  convertToHttpParams(...options: any[]): HttpParams {
    let httpParams = new HttpParams();
    for (const option of options) {
      for (const key in option) {
        if (option.hasOwnProperty(key)) {
          const value = option[key];
          let stringValue = '';
          if (value instanceof Date) {
            stringValue = moment(value).format('MM-DD-YYYY');
          } else {
            stringValue = value.toString();
          }
          if (stringValue !== undefined && stringValue !== null) {
            httpParams = httpParams.append(key, stringValue);
          }
        }
      }
    }
    return httpParams;
  }

  setEndPoint(endpoint: string): void {
    this.endpoint = endpoint;
  }
}
