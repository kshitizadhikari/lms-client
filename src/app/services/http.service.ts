import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

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

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
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

  convertToHttpParams(options: any): HttpParams {
    let httpParams = new HttpParams();
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const value = options[key];
        httpParams = httpParams.append(key, value.toString());
      }
    }
    return httpParams;
  }

  setEndPoint(endpoint: string): void {
    this.endpoint = endpoint;
  }
}
