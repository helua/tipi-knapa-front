import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './shop/Product';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor( private http: HttpClient ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/getProducts', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}
