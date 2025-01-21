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

    options.forEach(option => {
      if (typeof option === 'object' && option !== null) {
        Object.entries(option).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            const stringValue = value instanceof Date
              ? moment(value).format('MM-DD-YYYY')
              : value.toString();
            httpParams = httpParams.append(key, stringValue);
          }
        });
      }
    });

    return httpParams;
  }


  setEndPoint(endpoint: string): void {
    this.endpoint = endpoint;
  }
}
