import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private endpoint: string = '';
  constructor(
  ) {
  }

  private get url(): string {
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

  setEndPoint(endpoint: string): void {
    this.endpoint = endpoint;
  }
}
