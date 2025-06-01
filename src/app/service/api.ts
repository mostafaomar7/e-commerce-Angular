import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Api {
 private productApi = 'https://fakestoreapi.com/products';
  constructor( private http: HttpClient )  { }

  get<T>(): Observable<T> {
  return this.http.get<T>(this.productApi);
}

}
